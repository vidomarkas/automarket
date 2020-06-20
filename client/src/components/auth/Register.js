import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Alerts from "../layout/Alerts";
import registerImg from "../../assets/img/register.jpg";
import "./Register.scss";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

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
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else if (termsAgreed === false) {
      setAlert(
        "You need to agree to Terms and Conditions to continue",
        "danger"
      );
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="register__container shadow-min">
      <div
        className="register__left"
        style={{ backgroundImage: `url(${registerImg})` }}
      ></div>
      <div className="register__right">
        <div className="register__alert">
          <Alerts />
        </div>
        <div className="register__text-box">
          <h1 className="register__text-box__heading">
            Sign up for the <span>///AutoMarket</span>
          </h1>
          <p className="register__text-box__subheading">
            Enter your details below
          </p>
          <form onSubmit={onSubmit} className="register__form">
            <div className="register__form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                //required
              />
            </div>
            <div className="register__form__group">
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
            <div className="register__form__group">
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
            <div className="register__form__group">
              <label htmlFor="password2">Confirm password</label>
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={onChange}

                //required
              />
            </div>

            <div className="register__form__group register__form__group--checkbox">
              <input
                type="checkbox"
                name="termsConditions"
                id="termsConditions"
                className="register__checkbox"
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
              value="Register"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
        <p className="register__login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
