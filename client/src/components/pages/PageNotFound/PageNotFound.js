import React from "react";
import "./PageNotFound.scss";

const PageNotFound = (props) => {
  return (
    <div className="page-not-found__container shadow-min">
      <h1>Page not found</h1>
      <button className="btn btn-primary" onClick={props.history.goBack}>
        {" "}
        Take me back
      </button>
    </div>
  );
};

export default PageNotFound;
