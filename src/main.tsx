import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { CreditsProvider } from './contexts/CreditsContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <CreditsProvider>
        <App />
      </CreditsProvider>
    </LanguageProvider>
  </StrictMode>,
);
