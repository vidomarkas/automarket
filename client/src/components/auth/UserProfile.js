import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserProfile = ({ user }) => {
  return (
    <div style={{ margin: "200px auto", width: "80%" }}>
      <h1>{user && user.email}</h1>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
