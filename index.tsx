// index.tsx v1.0.1
import React from 'react';
import ReactDOM from 'react-dom/client';
// Explicitly including the .tsx extension ensures the dev server and module
// resolution correctly identify and transpile the component file, preventing
// potential fallback to SPA rewrite rules that might incorrectly serve HTML.
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
