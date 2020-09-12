import React, { useEffect } from "react";
import Spinner from "../../layout/Spinner";

const AdPublishing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="ad-publishing">
      <Spinner />
      <h2> Publishing...</h2>
    </div>
  );
};

export default AdPublishing;
