import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AuthState from "./context/auth/AuthState";
import AdState from "./context/ad/AdState";
import AlertState from "./context/alert/AlertState";
import PaginationState from "./context/pagination/PaginationState";

import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

JavascriptTimeAgo.addLocale(en);
JavascriptTimeAgo.addLocale(ru);

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <AdState>
        <AlertState>
          <PaginationState>
            <App />
          </PaginationState>
        </AlertState>
      </AdState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById("root")
);
