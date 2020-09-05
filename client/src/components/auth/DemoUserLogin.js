import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import demoImg from "../../assets/img/demo.jpg";
import "./Auth.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

const DemoUserLogin = (props, { login, email, password, isAuthenticated }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="auth__container shadow-min">
      <div
        className="auth__left"
        style={{ backgroundImage: `url(${demoImg})` }}
      ></div>
      <div className="auth__right">
        <h1 className="auth__demo-heading">Demo account</h1>

        <div className="auth__text-box">
          <h1 className="auth__text-box__heading">
            Sign In to the <span>{"///"}AutoMarket</span>
          </h1>
          <p className="auth__text-box__subheading">
            Test drive our website before signing up
          </p>
          <form onSubmit={onSubmit} className="auth__form">
            <div className="auth__form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value="demo@automarket.com"
                disabled
              />
            </div>

            <div className="auth__form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value="DemoPassword123"
                disabled
              />
            </div>
            <input
              type="submit"
              value="Log In as Demo User"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
        <p className="auth__login-link">
          To create new account <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

DemoUserLogin.propTypes = {
  login: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  email: state.user.email,
  password: state.user.password,
});

export default connect(mapStateToProps, {
  login,
})(DemoUserLogin);
