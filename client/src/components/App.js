import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import NavigationBar from "./layout/NavigationBar";

import Main from "./pages/Main";
import AdForm from "./ads/AdForm";
import AdDetails from "./pages/AdDetails";
import MyAds from "./pages/MyAds";
import TermsConditions from "./pages/TermsConditions";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import DemoUserLogin from "../components/auth/DemoUserLogin";
// import Alerts from "../components/layout/Alerts";
import setAuthToken from "../utils/setAuthToken";
import PrivateRoute from "../components/routing/PrivateRoute";
import AuthContext from "../context/auth/authContext";
import Footer from "../components/layout/Footer";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <div className="app">
        <NavigationBar />
        <div className="content">
          {/* <Alerts /> */}
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <PrivateRoute exact path="/myads" component={MyAds}></PrivateRoute>
            <Route exact path="/ads/:id" component={AdDetails}></Route>
            <PrivateRoute
              exact
              path="/editing"
              component={AdForm}
            ></PrivateRoute>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/demo" component={DemoUserLogin}></Route>
            <Route
              exact
              path="/terms-and-conditions"
              component={TermsConditions}
            ></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
