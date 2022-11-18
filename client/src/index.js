import React from 'react';
import ReactDOM from 'react-dom/client';
import User from './store/UserContext';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 
  <User>
    <App />
  </User>
  // </React.StrictMode>
);
