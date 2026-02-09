import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NEXT_PUBLIC_TINA_CLIENT_ID': JSON.stringify(env.NEXT_PUBLIC_TINA_CLIENT_ID),
        'process.env.TINA_TOKEN': JSON.stringify(env.TINA_TOKEN),
        'import.meta.env.NEXT_PUBLIC_TINA_CLIENT_ID': JSON.stringify(env.NEXT_PUBLIC_TINA_CLIENT_ID),
        'import.meta.env.TINA_TOKEN': JSON.stringify(env.TINA_TOKEN)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
