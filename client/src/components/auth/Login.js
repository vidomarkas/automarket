import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alerts from "../layout/Alerts/Alerts";
import loginImg from "../../assets/img/login.jpg";
import "./Auth.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alertActions";
import { login, clearErrors } from "../../actions/authActions";

const Login = (
  props,
  { setAlert, login, clearErrors, email, password, error, isAuthenticated }
) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      login({ email, password });
    }
  };

  return (
    <div className="auth__container shadow-min">
      <div
        className="auth__left"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>
      <div className="auth__right">
        <div className="auth__alert">
          <Alerts />
        </div>
        <div className="auth__text-box">
          <h1 className="auth__text-box__heading">
            Sign In to the <span>{"///"}AutoMarket</span>
          </h1>
          <p className="auth__text-box__subheading">Enter your details below</p>
          <form onSubmit={onSubmit} className="auth__form">
            <div className="auth__form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="auth__form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <input
              type="submit"
              value="Log In"
              className="btn btn-primary btn-block"
            />
            {/* <input
              type="submit"
              value="Forgot your password?"
              className="btn btn-secondary btn-block"
            /> */}
          </form>
        </div>
        <p className="auth__login-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  error: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
  email: state.user.email,
  password: state.user.password,
});

export default connect(mapStateToProps, {
  setAlert,
  login,
  clearErrors,
})(Login);
