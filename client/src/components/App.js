import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./layout/Navbar";
import Main from "./pages/Main";
import AdForm from "./ads/AdForm";
import AdDetails from "./pages/AdDetails";
import MyAds from "./pages/MyAds";
import AdState from "../context/ad/AdState";
import AuthState from "../context/auth/AuthState";
import AlertState from "../context/alert/AlertState";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Alerts from "../components/layout/Alerts";
import setAuthToken from "../utils/setAuthToken";
import PrivateRoute from "../components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AdState>
        <AlertState>
          <Router>
            <>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Main}></Route>
                  <PrivateRoute
                    exact
                    path="/myads"
                    component={MyAds}
                  ></PrivateRoute>
                  <Route exact path="/ads/:id" component={AdDetails}></Route>
                  <PrivateRoute
                    exact
                    path="/editing"
                    component={AdForm}
                  ></PrivateRoute>
                  <Route exact path="/register" component={Register}></Route>
                  <Route exact path="/login" component={Login}></Route>
                </Switch>
              </div>
            </>
          </Router>
        </AlertState>
      </AdState>
    </AuthState>
  );
}

export default App;
