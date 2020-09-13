import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./layout/NavBar/NavBar";
import Main from "./pages/Main";
import AdForm from "./ads/AdForm/AdForm";
import AdGrid from "./ads/AdGrid/AdGrid";
import AdDetails from "./ads/AdDetails/AdDetails";
import MyAds from "./ads/MyAds/MyAds";
import SavedAds from "./ads/SavedAds/SavedAds";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import DemoUserLogin from "../components/auth/DemoUserLogin";
import UserProfile from "../components/auth/UserProfile";
import PrivateRoute from "../components/routing/PrivateRoute";
import Footer from "./layout/Footer/Footer";
import "./normalize.scss";
import "./App.scss";
import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "../actions/authActions";
import { connect } from "react-redux";

const App = ({ loadUser }) => {
  useEffect(() => {
    // load token into global headers and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, [loadUser]);
  return (
    <Router>
      <div className="app">
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Main}></Route>
            <Route exact path="/cars/:id" component={AdDetails}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/demo" component={DemoUserLogin}></Route>
            <Route exact path="/featured" component={AdGrid}></Route>
            <Route
              exact
              path="/terms-and-conditions"
              component={TermsConditions}
            ></Route>
            <PrivateRoute exact path="/mycars" component={MyAds}></PrivateRoute>
            <PrivateRoute
              exact
              path="/saved"
              component={SavedAds}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/editing"
              component={AdForm}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/profile"
              component={UserProfile}
            ></PrivateRoute>
            <Route component={PageNotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default connect(null, { loadUser })(App);
