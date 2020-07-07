import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <div style={{ margin: "200px auto", width: "80%" }}>
      <h1>{user && user.email}</h1>
    </div>
  );
};

export default UserProfile;
