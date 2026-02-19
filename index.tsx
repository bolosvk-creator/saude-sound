import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Certifique-se que o App.tsx está na mesma pasta

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root para montar a aplicação");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);