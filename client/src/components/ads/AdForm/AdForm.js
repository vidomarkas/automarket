import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  postAd,
  updateAd,
  uploadImage,
  clearCurrent,
} from "../../../actions/adActions";
import { setAlert } from "../../../actions/alertActions";
import { postcodeValidation } from "../../../actions/generalActions";
import Alerts from "../../layout/Alerts/Alerts";
import "./AdForm.scss";
import AdPublished from "./AdPublished";
import AdPublishing from "./AdPublishing";
import PhotoUploader from "./PhotoUploader";
import FormMainInfo from "./FormMainInfo";
import FormDescription from "./FormDescription";
import PropTypes from "prop-types";

const AdForm = ({
  history,
  postAd,
  updateAd,
  uploadImage,
  clearCurrent,
  currentImg,
  current,
  setAlert,
  postcodeValidation,
}) => {
  const initialState = {
    // required fields
    make: "",
    model: "",
    dateManufactured: "",
    regNo: "",
    postcode: "",
    phoneNumber: "",
    color: "",
    price: "",
    mileage: "",
    // not required fields / predefined values
    description: "",
    engineCapacity: "",
    power: "",
    VINnumber: "",
    image: "",
    imageURL: null,
    bodyType: "saloon",
    fuelType: "diesel",
    gearbox: "manual",
    doors: "4/5",
    damage: "No damage",
    steeringWheel: "RHD",
    powerUnit: "hp",
    mileageUnit: "mi",
    featured: false,
    sold: false,
    dateUpdated: "",
  };

  const [ad, setAd] = useState(initialState);

  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  // Validation errors
  const [errorFields, setErrorFields] = useState([]);

  const {
    make,
    model,
    dateManufactured,
    color,
    price,
    mileage,
    description,
    phoneNumber,
    postcode,
    imageURL,
    image,
    regNo,
    featured,
    sold,
  } = ad;

  // Determine whether the ad is being updated or it is a new ad
  useEffect(() => {
    if (current !== null) {
      setAd(current);
    } else {
      setAd(initialState);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (publishing && currentImg !== null) {
      setAd({
        ...ad,
        imageURL: currentImg,
      });
    }
    // eslint-disable-next-line
  }, [currentImg, publishing]);

  // Ready to post/update ad
  useEffect(() => {
    if (publishing && imageURL !== null) {
      if (current === null) {
        postAd(ad);
      } else {
        updateAd(ad);
      }
      setPublishing(false);
      setPublished(true);
      setAd(initialState);
      clearCurrent();
    }
    // eslint-disable-next-line
  }, [imageURL, publishing]);

  useEffect(() => {
    if (image) {
      setAd({ ...ad, imageURL: null });
    }
    // eslint-disable-next-line
  }, [image]);

  // Ad published, redirecting to /myads
  useEffect(() => {
    if (published && !publishing) {
      const timer = setTimeout(() => {
        history.push("/mycars");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [published, publishing]);

  // ======================= Start of validation ====================
  const validation = async () => {
    // Empty fields
    const emptyFields = [];
    const validateEmptyFields = () => {
      // Required fields
      const reqFields = {
        make,
        model,
        dateManufactured,
        phoneNumber,
        postcode,
        price,
        color,
        regNo,
        mileage,
      };

      const emptyFieldError = () => {
        setAlert("Please enter required fields", "danger");
        for (let field in reqFields) {
          if (reqFields[field] === "") {
            emptyFields.push(field);
          }
        }
        setErrorFields([...emptyFields]);
      };

      if (Object.values(reqFields).some((field) => field === "")) {
        emptyFieldError();

        return false;
      } else {
        return true;
      }
    };

    const validatePostcode = async (postcode) => {
      const res = await postcodeValidation(postcode);

      if (res === false) {
        setAlert("Please enter a valid postcode", "danger");
        setErrorFields([...emptyFields, "postcode"]);
      }
      return res;
    };

    // if both true, validation passed
    if (validateEmptyFields() && (await validatePostcode(postcode))) {
      return true;
    } else {
      return false;
    }
  };

  // ======================= Actions ====================
  const onSubmit = async (e) => {
    e.preventDefault();

    const validated = await validation();
    //setAd({ ...ad, dateUpdated: createCurrentDate() });
    if (validated) {
      // Passed validation
      setPublishing(true);

      // If user added image
      if (ad.image) {
        uploadImage(ad.image);
      } else {
        setAd({
          ...ad,
          imageURL: "",
        });
      }
    }
  };

  const onCancel = () => {
    setPublishing(false);
    setAd(initialState);
    clearCurrent();
    history.push("/mycars");
  };

  const onChangeSoldStatus = () => {
    setAd({ ...ad, sold: !sold });
  };

  // On change in inputs, update ad state
  const onChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
    const errorFieldsCopy = errorFields.slice();
    const index = errorFields.indexOf(e.target.name);
    if (index !== -1) {
      errorFieldsCopy.splice(index, 1);
      setErrorFields([...errorFieldsCopy]);
    }
  };

  // On change in image upload input, update state
  const onImageSelect = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.files[0] });
  };

  const onCheck = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.checked });
  };

  return (
    <div className="ad-form__container shadow-min">
      {!publishing && !published ? (
        <>
          <div className="ad-form__top">
            <h1 className="ad-form__top__heading">
              {current ? "Advert editing" : "New advert"}
            </h1>
            {current ? (
              <div className="ad-form__top__controls">
                {sold ? (
                  <button
                    className="ad-form__top__controls--sold btn btn-success"
                    onClick={onChangeSoldStatus}
                  >
                    Mark as for sale
                  </button>
                ) : (
                  <button
                    className="ad-form__top__controls--sold btn btn-danger"
                    onClick={onChangeSoldStatus}
                  >
                    Mark as sold
                  </button>
                )}
              </div>
            ) : null}
          </div>
          <Alerts />

          <form
            className="ad-form__form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <FormMainInfo
              onChange={onChange}
              ad={ad}
              emptyFields={errorFields}
            />
            <FormDescription onChange={onChange} description={description} />
            <PhotoUploader onImageSelect={onImageSelect} imageURL={imageURL} />
            <div className="ad-form__section">
              <h2 className="ad-form__section__heading">Extra services</h2>
              <p className="ad-form__section__text">
                Set your ad as featured for free
              </p>
              <div className="ad-form__field__checkbox">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  onChange={onCheck}
                  className="ad-form__field__input--mr"
                  checked={featured}
                />
                <label htmlFor="featured" className="ad-form__field__label">
                  Featured
                </label>
              </div>
            </div>
            <div className="ad-form__section">
              <h2 className="ad-form__section__heading">Contact information</h2>
              <div className="ad-form__group ad-form__group--start">
                <div className="ad-form__field">
                  <label
                    htmlFor="phoneNumber"
                    className="ad-form__field__label"
                  >
                    <span>
                      Phone number
                      <span className="ad-form__field__label--required">*</span>
                    </span>

                    <input
                      type="tel"
                      pattern="[0-9]{11}"
                      maxLength="11"
                      title="i.e. 07123456789"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={onChange}
                      className={
                        errorFields.indexOf("phoneNumber") === -1
                          ? "ad-form__field__input ad-form__field__input--mr"
                          : "ad-form__field__input ad-form__field__input--mr ad-form__field__input--failed"
                      }
                    />
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="postcode" className="ad-form__field__label">
                    <span>
                      Postcode
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <input
                      type="text"
                      name="postcode"
                      value={postcode}
                      onChange={onChange}
                      className={
                        errorFields.indexOf("postcode") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="ad-form__controls">
              <input
                type="submit"
                className={
                  errorFields.length > 0
                    ? "btn btn-danger ad-form__controls__btn--mr"
                    : "btn btn-primary ad-form__controls__btn--mr"
                }
                value={current ? "Update" : "Publish"}
              />
              <input
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
                value="Cancel"
              />
            </div>
          </form>
        </>
      ) : publishing && !published ? (
        <AdPublishing />
      ) : (
        <AdPublished />
      )}
    </div>
  );
};

AdForm.propTypes = {
  current: PropTypes.object,
  currentImg: PropTypes.object,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentImg: state.ad.currentImg,
  current: state.ad.current,
  user: state.user,
  auth: state.auth,
  postAd: PropTypes.func.isRequired,
  updateAd: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  postcodeValidation: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  postAd,
  updateAd,
  uploadImage,
  clearCurrent,
  setAlert,
  postcodeValidation,
})(AdForm);
