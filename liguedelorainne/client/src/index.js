import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContext from './Context/ShopContext';

// Create a constant for the root element
const rootElement = document.getElementById('root');

// Use destructuring to get the createRoot method from ReactDOM
const root = ReactDOM.createRoot(rootElement);

// Render the App component wrapped in the ShopContextProvider
root.render(
  <ShopContext.Provider>
    <App />
  </ShopContext.Provider>
);
