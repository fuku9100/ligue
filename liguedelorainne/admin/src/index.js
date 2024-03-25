// Import React and ReactDOM, which are required for rendering React components
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the App component, which is the top-level component of the application
import App from './App';

// Import the index.css file, which contains global styles for the application
import './index.css';

// Create a root ReactDOM element, which will be used to render the App component
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Render the App component to the root ReactDOM element
root.render(
  <React.StrictMode>
    {/* Wrap the App component with React.StrictMode to enable additional checks and warnings for development */}
    <App />
  </React.StrictMode>
);
