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
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


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
