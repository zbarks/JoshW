import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Old links used hash routes (/#/academy). Send them to the clean URL.
if (window.location.hash.startsWith('#/')) {
  const path = window.location.hash.slice(1);
  window.history.replaceState(null, '', path);
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Could not find root element to mount to');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
