<?php
/**
 * GitHub Webhook Handler for HKM Website Auto-Deployment
 * 
 * This script listens for GitHub push events and triggers automatic deployment
 */

// Secret token for webhook verification (change this!)
define('WEBHOOK_SECRET', '319dc14bdd411f34194987788c281dbff4257bd04ff8d228208bba6fd1a2af73');

// Log file
define('LOG_FILE', '/var/www/HKM-WEBSITE/webhook.log');

// Deployment script path
define('DEPLOY_SCRIPT', '/var/www/HKM-WEBSITE/deploy.sh');

/**
 * Log messages to file
 */
function logMessage($message) {
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents(LOG_FILE, "[$timestamp] $message\n", FILE_APPEND);
}

/**
 * Verify GitHub webhook signature
 */
function verifySignature($payload, $signature) {
    if (empty($signature)) {
        return false;
    }
    
    $hash = 'sha256=' . hash_hmac('sha256', $payload, WEBHOOK_SECRET);
    return hash_equals($hash, $signature);
}

// Get the payload
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

// Verify signature
if (!verifySignature($payload, $signature)) {
    logMessage('ERROR: Invalid signature');
    http_response_code(403);
    die('Invalid signature');
}

// Parse the payload
$data = json_decode($payload, true);

// Check if it's a push event to main-hkm branch
if (isset($data['ref']) && $data['ref'] === 'refs/heads/main-hkm') {
    logMessage('INFO: Push event detected on main-hkm branch');
    logMessage('INFO: Commit: ' . ($data['head_commit']['message'] ?? 'N/A'));
    logMessage('INFO: Author: ' . ($data['pusher']['name'] ?? 'N/A'));
    
    // Execute deployment script in background
    $command = 'bash ' . DEPLOY_SCRIPT . ' > /dev/null 2>&1 &';
    exec($command);
    
    logMessage('INFO: Deployment script triggered');
    
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Deployment triggered']);
} else {
    logMessage('INFO: Ignoring event - not a push to main-hkm');
    http_response_code(200);
    echo json_encode(['status' => 'ignored', 'message' => 'Not a push to main-hkm']);
}
