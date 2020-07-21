import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";

const SavedAds = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { user } = authContext;
  const { savedAds, removeAd, getSavedAds } = userContext;
  useEffect(() => {
    getSavedAds();
  }, []);

  // Remove ad from saved ads list
  const onRemoveAd = (id) => {
    console.log("REMOVING AD...", id);
    removeAd(id);
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <h1>Saved ads</h1>
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

export default SavedAds;
