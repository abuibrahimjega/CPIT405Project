import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Application from './application'; // renamed from App to Application

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
