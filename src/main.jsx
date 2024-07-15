import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Workbox } from 'workbox-window';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js');
  wb.register().then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
}