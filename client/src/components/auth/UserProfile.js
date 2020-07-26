import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";

const UserProfile = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { user } = authContext;
  const { savedAds, removeAd, getSavedAds } = userContext;

  useEffect(() => {
    getSavedAds();
    // eslint-disable-next-line
  }, []);

  // Remove ad from saved ads list
  const onRemoveAd = (id) => {
    console.log("REMOVING AD...", id);
    removeAd(id);
  };

  return (
    <div style={{ margin: "200px auto", width: "80%" }}>
      <h1>{user && user.email}</h1>

      {savedAds && savedAds.length > 0 && (
        <>
          <h2>Saved ads: {savedAds.length}</h2>
          <ul>
            {savedAds.map((ad) => (
              <li>
                {ad}
                <button
                  onClick={() => {
                    onRemoveAd(ad._id);
                  }}
                >
                  Remove ad
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserProfile;
