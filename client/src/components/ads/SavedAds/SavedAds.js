import React, { useContext, useEffect } from "react";
import UserContext from "../../../context/user/userContext";
import "./SavedAds.scss";
import AdGrid from "../AdGrid";

const SavedAds = () => {
  const userContext = useContext(UserContext);
  const { savedAds, removeAd, getSavedAds } = userContext;
  useEffect(() => {
    getSavedAds();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Remove ad from saved ads list
  const onRemoveAd = (id) => {
    console.log("REMOVING AD...", id);
    removeAd(id);
  };

  return (
    // <div style={{ marginTop: "200px" }}>
    //   <h1>Saved ads</h1>
    //   {savedAds && savedAds.length > 0 && (
    //     <>
    //       <h2>Saved ads: {savedAds.length}</h2>
    //       <ul>
    //         {savedAds.map((ad) => (
    //           <li key={ad._id}>
    //             <img src={ad.imageURL} alt={ad.model} />
    //             {ad.make}
    //             {ad.model}
    //             <button
    //               onClick={() => {
    //                 onRemoveAd(ad._id);
    //               }}
    //             >
    //               Remove ad
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     </>
    //   )}
    // </div>
    <div className="ad-grid__container">
      <h1>Saved ads</h1>
      {savedAds && savedAds.length > 0 && <AdGrid ads={savedAds} />}
    </div>
  );
};

export default SavedAds;
