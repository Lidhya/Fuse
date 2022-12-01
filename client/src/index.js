import React from 'react';
import ReactDOM from 'react-dom/client';
import User from './context/UserContext';
import Socket from './context/SocketContext';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> 
  <User>
    <Socket>
    <App />
    </Socket>
  </User>
  // </React.StrictMode>
);
