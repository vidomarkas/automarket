import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Alerts from "../layout/Alerts/Alerts";
import registerImg from "../../assets/img/register.jpg";
import "./Auth.scss";
import { connect } from "react-redux";
import { setAlert, clearAllAlerts } from "../../actions/alertActions";
import { register, clearErrors } from "../../actions/authActions";

const Register = ({
  history,
  setAlert,
  clearAllAlerts,
  register,
  clearErrors,
  error,
  isAuthenticated,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    termsAgreed: false,
  });

  const { name, email, password, password2, termsAgreed } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onCheck = (e) => {
    setUser({ ...user, termsAgreed: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    clearAllAlerts();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else if (termsAgreed === false) {
      setAlert("Please agree to Terms and Conditions", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="auth__container shadow-min">
      <div
        className="auth__left"
        style={{ backgroundImage: `url(${registerImg})` }}
      ></div>
      <div className="auth__right">
        <div className="auth__alert">
          <Alerts />
        </div>
        <div className="auth__text-box">
          <h1 className="auth__text-box__heading">
            Sign up for <span>{"///"}AutoMarket</span>
          </h1>
          <p className="auth__text-box__subheading">Enter your details below</p>
          <form onSubmit={onSubmit} className="auth__form">
            <div className="auth__form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                //required
              />
            </div>
            <div className="auth__form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                //required
                minLength="6"
              />
            </div>
            <div className="auth__form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                // required
                minLength="6"
                placeholder="Minimum 6 symbols"
              />
            </div>
            <div className="auth__form__group">
              <label htmlFor="password2">Confirm password</label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}

                //required
              />
            </div>

            <div className="auth__form__group auth__form__group--checkbox">
              <input
                type="checkbox"
                name="termsConditions"
                id="termsConditions"
                className="auth__checkbox"
                onChange={onCheck}
              />
              <label htmlFor="termsConditions">
                I agree to the{" "}
                <Link target="_blank" to="/terms-and-conditions">
                  Terms and Conditions
                </Link>{" "}
              </label>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
        <p className="auth__login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  clearAllAlerts: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setAlert,
  clearAllAlerts,
  register,
  clearErrors,
})(Register);
