<?php
/**
 * Secure GitHub Webhook Handler for HKM Website Auto-Deployment
 * 
 * Security Features:
 * - Environment-based secret management
 * - IP whitelist validation
 * - Rate limiting
 * - Input sanitization
 * - Detailed logging with rotation
 * - Command injection prevention
 */

// Load environment variables
require_once __DIR__ . '/webhook-config.php';

// Configuration
define('LOG_FILE', '/var/www/HKM-WEBSITE/logs/webhook.log');
define('ERROR_LOG_FILE', '/var/www/HKM-WEBSITE/logs/webhook-error.log');
define('DEPLOY_SCRIPT', '/var/www/HKM-WEBSITE/deploy.sh');
define('MAX_LOG_SIZE', 10 * 1024 * 1024); // 10MB

// GitHub IP ranges (update regularly from https://api.github.com/meta)
$GITHUB_IP_RANGES = [
    '140.82.112.0/20',
    '143.55.64.0/20',
    '185.199.108.0/22',
    '192.30.252.0/22',
    '2a0a:a440::/29',
    '2606:50c0::/32'
];

/**
 * Rotate log file if it exceeds max size
 */
function rotateLogIfNeeded($logFile) {
    if (file_exists($logFile) && filesize($logFile) > MAX_LOG_SIZE) {
        $timestamp = date('Y-m-d_H-i-s');
        rename($logFile, $logFile . '.' . $timestamp);
    }
}

/**
 * Log messages to file with rotation
 */
function logMessage($message, $level = 'INFO') {
    rotateLogIfNeeded(LOG_FILE);
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $logEntry = "[$timestamp] [$level] [IP: $ip] $message\n";
    file_put_contents(LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Log errors separately
 */
function logError($message) {
    rotateLogIfNeeded(ERROR_LOG_FILE);
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $logEntry = "[$timestamp] [ERROR] [IP: $ip] $message\n";
    file_put_contents(ERROR_LOG_FILE, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Check if IP is in allowed range
 */
function isIpAllowed($ip, $allowedRanges) {
    foreach ($allowedRanges as $range) {
        if (strpos($range, '/') !== false) {
            list($subnet, $mask) = explode('/', $range);
            if ((ip2long($ip) & ~((1 << (32 - $mask)) - 1)) == ip2long($subnet)) {
                return true;
            }
        } else {
            if ($ip === $range) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Verify GitHub webhook signature
 */
function verifySignature($payload, $signature, $secret) {
    if (empty($signature) || empty($secret)) {
        return false;
    }
    
    $hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    return hash_equals($hash, $signature);
}

/**
 * Rate limiting check
 */
function checkRateLimit() {
    $rateLimitFile = '/tmp/webhook_rate_limit_' . md5($_SERVER['REMOTE_ADDR']);
    $currentTime = time();
    $timeWindow = 60; // 1 minute
    $maxRequests = 5;
    
    if (file_exists($rateLimitFile)) {
        $data = json_decode(file_get_contents($rateLimitFile), true);
        $requests = array_filter($data['requests'], function($timestamp) use ($currentTime, $timeWindow) {
            return ($currentTime - $timestamp) < $timeWindow;
        });
        
        if (count($requests) >= $maxRequests) {
            return false;
        }
        
        $requests[] = $currentTime;
        file_put_contents($rateLimitFile, json_encode(['requests' => $requests]));
    } else {
        file_put_contents($rateLimitFile, json_encode(['requests' => [$currentTime]]));
    }
    
    return true;
}

/**
 * Sanitize input
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags($data), ENT_QUOTES, 'UTF-8');
}

// Main execution
try {
    // Check rate limit
    if (!checkRateLimit()) {
        logError('Rate limit exceeded');
        http_response_code(429);
        die(json_encode(['status' => 'error', 'message' => 'Rate limit exceeded']));
    }
    
    // Verify IP address
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? '';
    if (!isIpAllowed($clientIp, $GITHUB_IP_RANGES)) {
        logError("Unauthorized IP attempt: $clientIp");
        http_response_code(403);
        die(json_encode(['status' => 'error', 'message' => 'Unauthorized IP']));
    }
    
    // Get the payload
    $payload = file_get_contents('php://input');
    if (empty($payload)) {
        logError('Empty payload received');
        http_response_code(400);
        die(json_encode(['status' => 'error', 'message' => 'Empty payload']));
    }
    
    // Verify signature
    $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
    if (!verifySignature($payload, $signature, WEBHOOK_SECRET)) {
        logError('Invalid signature');
        http_response_code(403);
        die(json_encode(['status' => 'error', 'message' => 'Invalid signature']));
    }
    
    // Parse and sanitize the payload
    $data = json_decode($payload, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        logError('Invalid JSON payload');
        http_response_code(400);
        die(json_encode(['status' => 'error', 'message' => 'Invalid JSON']));
    }
    
    $data = sanitizeInput($data);
    
    // Check if it's a push event to main-hkm branch
    if (isset($data['ref']) && $data['ref'] === 'refs/heads/main-hkm') {
        $commitMessage = $data['head_commit']['message'] ?? 'N/A';
        $author = $data['pusher']['name'] ?? 'N/A';
        
        logMessage("Push event detected on main-hkm branch");
        logMessage("Commit: $commitMessage");
        logMessage("Author: $author");
        
        // Validate deploy script exists and is executable
        if (!file_exists(DEPLOY_SCRIPT)) {
            logError('Deploy script not found');
            http_response_code(500);
            die(json_encode(['status' => 'error', 'message' => 'Deploy script not found']));
        }
        
        if (!is_executable(DEPLOY_SCRIPT)) {
            logError('Deploy script not executable');
            http_response_code(500);
            die(json_encode(['status' => 'error', 'message' => 'Deploy script not executable']));
        }
        
        // Execute deployment script with proper escaping
        $command = escapeshellcmd('bash ' . DEPLOY_SCRIPT) . ' > /dev/null 2>&1 &';
        exec($command, $output, $returnCode);
        
        logMessage('Deployment script triggered successfully');
        
        http_response_code(200);
        echo json_encode([
            'status' => 'success', 
            'message' => 'Deployment triggered',
            'timestamp' => date('c')
        ]);
    } else {
        $ref = $data['ref'] ?? 'unknown';
        logMessage("Ignoring event - not a push to main-hkm (ref: $ref)");
        http_response_code(200);
        echo json_encode(['status' => 'ignored', 'message' => 'Not a push to main-hkm']);
    }
    
} catch (Exception $e) {
    logError('Exception: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Internal server error']);
}
