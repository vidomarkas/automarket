import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authActions";
import setAuthToken from "../../utils/setAuthToken";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({
  component: Component,
  loading,
  isAuthenticated,
  ...rest
}) => {
  useEffect(() => {
    // load token into global headers and load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      loadUser();
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : !loading && isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
