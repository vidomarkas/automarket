import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Alerts from "../layout/Alerts/Alerts";
import loginImg from "../../assets/img/login.jpg";
import "./Auth.scss";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { email, password } = user;
  const { login, error, clearErrors, isAuthenticated } = authContext;

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

export default Login;
