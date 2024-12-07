import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BASE_URL } from './src/constants/constants';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: BASE_URL,
});
