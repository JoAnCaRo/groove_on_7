import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

// Forzar todos los event listeners a ser pasivos
const supportsPassive = (() => {
  let supported = false;
  try {
    window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
      get: () => supported = true
    }));
  } catch (e) {}
  return supported;
})();

if (supportsPassive) {
  document.addEventListener('touchstart', () => {}, { passive: true });
  document.addEventListener('touchmove', () => {}, { passive: true });
}

// Importaciones de React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Componente principal
import './index.css'; // Estilos globales opcionales

// Montar la aplicación React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
