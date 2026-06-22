import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'vite-plugin-pwa'; // Importação movida para o topo
import App from './App.tsx';
import './index.css';

// Registra o Service Worker do PWA imediatamente
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);