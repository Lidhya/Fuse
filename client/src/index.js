import React from "react";
import ReactDOM from "react-dom/client";
import User from "./context/UserContext";
import Socket from "./context/SocketContext";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import App from "./App";
import ErrorHandler from "./Pages/ErrorHandler";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ErrorBoundary FallbackComponent={<ErrorHandler />}>
    <User>
      <Socket>
        <App />
      </Socket>
    </User>
  </ErrorBoundary>
  // </React.StrictMode>
);
