import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* Punto de entrada principal donde se monta la aplicación React en el DOM del navegador */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
