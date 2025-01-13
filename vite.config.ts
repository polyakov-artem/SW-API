import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { PUBLIC_PATH } from './src/constants/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: PUBLIC_PATH,
});
