import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./layout/NavigationBar";
import Main from "./pages/Main";
import PageNotFound from "./pages/PageNotFound";
import AdForm from "./ads/AdForm/AdForm";
import AdGrid from "./ads/AdGrid";
import AdDetails from "./ads/AdDetails/AdDetails";
import MyAds from "./ads/MyAds";
import TermsConditions from "./pages/TermsConditions";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import DemoUserLogin from "../components/auth/DemoUserLogin";
import UserProfile from "../components/auth/UserProfile";
import setAuthToken from "../utils/setAuthToken";
import PrivateRoute from "../components/routing/PrivateRoute";
import AuthContext from "../context/auth/authContext";
import UserContext from "../context/user/userContext";

import Footer from "../components/layout/Footer";
import "./normalize.scss";
import "./App.scss";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    authContext.loadUser();
    userContext.getSavedAds();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <div className="app">
        <NavigationBar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <PrivateRoute exact path="/mycars" component={MyAds}></PrivateRoute>
            <Route exact path="/cars/:id" component={AdDetails}></Route>
            <PrivateRoute
              exact
              path="/editing"
              component={AdForm}
            ></PrivateRoute>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/demo" component={DemoUserLogin}></Route>
            <Route exact path="/featured" component={AdGrid}></Route>
            <PrivateRoute
              exact
              path="/profile"
              component={UserProfile}
            ></PrivateRoute>
            <Route
              exact
              path="/terms-and-conditions"
              component={TermsConditions}
            ></Route>
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
