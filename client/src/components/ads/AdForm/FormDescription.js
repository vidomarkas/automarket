import React from "react";

const FormDescription = ({ onChange, description }) => {
  return (
    <div className="ad-form__section ">
      <h2 className="ad-form__section__heading">Description</h2>
      <div className="ad-form__description__section">
        <textarea
          name="description"
          cols="20"
          rows="10"
          value={description}
          onChange={onChange}
          className="ad-form__description__textarea"
        ></textarea>
        <div className="ad-form__description__comments">
          <p>Detailed comment can attract more attention to your ad.</p>

          <p>
            The more informative your ad is, the less questions you will be
            asked.
          </p>
          <p>
            Adverts with interesting comments can be featured on automarket
            facebook page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormDescription;
