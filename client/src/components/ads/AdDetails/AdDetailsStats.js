import React from "react";
import ReactTimeAgo from "react-time-ago";
import Spinner from "../../layout/Spinner";

const AdDetailsStats = ({ ad }) => {
  const { seenCount, savedCount, dateAdded, dateUpdated } = ad;

  return (
    <>
      {ad ? (
        <div className="car-details__info shadow-min">
          <h2>Statistics</h2>
          <p>{seenCount} views</p>
          <p>{savedCount} saves</p>

          <p>
            Ad created: <ReactTimeAgo date={Date.parse(dateAdded)} />{" "}
          </p>
          <p>
            Last updated: <ReactTimeAgo date={Date.parse(dateUpdated)} />
          </p>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AdDetailsStats;
