import React from "react";

const PhotoUploader = (props) => {
  return (
    <div className="ad-form__section">
      <h2 className="ad-form__section__heading">Photos</h2>
      <label htmlFor="image" className="ad-form__field__label">
        Upload image
        <input type="file" name="image" onChange={props.onImageSelect} />
      </label>
      {props.imageURL && (
        <img src={props.imageURL} style={{ width: "80%" }} alt="" />
      )}
    </div>
  );
};

export default PhotoUploader;
