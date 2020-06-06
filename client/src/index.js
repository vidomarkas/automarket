import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AuthState from "./context/auth/AuthState";
import AdState from "./context/ad/AdState";
import AlertState from "./context/alert/AlertState";

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AdState>
        <AlertState>
          <App />
        </AlertState>
      </AdState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
