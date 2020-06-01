import React from "react";

const PostAd = () => {
  return (
    <div>
      <form>
        <label htmlFor="">Make</label>
        <input type="text" />
        <label htmlFor="">Model</label>
        <input type="text" />
        <label htmlFor="">Price</label>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input
          type="submit"
          className="btn btn-block bg-primary"
          value="Post an ad"
        />
      </form>
    </div>
  );
};

export default PostAd;
