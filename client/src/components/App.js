import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./layout/Navbar";
import Main from "./pages/Main";
import AdForm from "./ads/AdForm";
import AdDetails from "./pages/AdDetails";
import AdState from "../context/ad/AdState";

function App() {
  return (
    <AdState>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Main}></Route>
              <Route exact path="/ads/:id" component={AdDetails}></Route>
              <Route exact path="/editing" component={AdForm}></Route>
            </Switch>
          </div>
        </>
      </Router>
    </AdState>
  );
}

export default App;
