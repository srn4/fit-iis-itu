import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import axios from 'axios';

axios.defaults.withCredentials = true;
//axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
//axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';


// Locate the root element in the HTML
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Create a root using the new createRoot API
const root = createRoot(rootElement);

// Render the App component within the BrowserRouter
root.render(
  //<React.StrictMode>
      <App />
  //</React.StrictMode>
);

// Performance measuring (optional)
reportWebVitals();
