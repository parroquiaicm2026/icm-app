
import React from 'react';
import { createRoot } from 'react-dom/client';

console.log("main.jsx start");

const root = createRoot(document.getElementById('root'));

async function boot() {
  try {
    console.log("Attempting to import App.jsx...");
    const { default: App } = await import('./App.jsx');
    console.log("App.jsx imported successfully!");
    root.render(<App />);
  } catch (err) {
    console.error("FATAL ERROR DURING APP IMPORT:", err);
    root.render(
      <div style={{ background: 'red', color: 'white', padding: '50px' }}>
        <h1>ERROR FATAL DE IMPORTACIÓN</h1>
        <pre>{err.message}</pre>
        <pre>{err.stack}</pre>
      </div>
    );
  }
}

boot();
