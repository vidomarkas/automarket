import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../../context/alert/alertContext";
import AdContext from "../../../context/ad/adContext";
import GeneralContext from "../../../context/general/generalContext";
import Alerts from "../../layout/Alerts";
import Spinner from "../../layout/Spinner";
import "./AdForm.scss";
import AdPublished from "./AdPublished";
import PhotoUploader from "./PhotoUploader";
import FormMainInfo from "./FormMainInfo";
import FormDescription from "./FormDescription";

const AdForm = (props) => {
  const adContext = useContext(AdContext);
  const {
    postAd,
    updateAd,
    uploadImage,
    current,
    clearCurrent,
    currentImg,
  } = adContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const generalContext = useContext(GeneralContext);
  const { postcodeValidation } = generalContext;

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
  const [errorFields, setErrorFields] = useState([]);

  // Determine whether the ad is being updated or it is a new ad
  useEffect(() => {
    if (current !== null) {
      setAd(current);
    } else {
      setAd(initialState);
    }
    // eslint-disable-next-line
  }, []);

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

  // Ad published, redirecting to /myads
  useEffect(() => {
    if (published && !publishing) {
      const timer = setTimeout(() => {
        props.history.push("/mycars");
      }, 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [published, publishing]);

  useEffect(() => {
    if (image) {
      setAd({ ...ad, imageURL: null });
    }
    // eslint-disable-next-line
  }, [image]);

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

  const createCurrentDate = () => {
    const date = new Date();
    return date.toISOString();
  };

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

  // ======================= End of validation ====================

  const onSubmit = async (e) => {
    e.preventDefault();

    const validated = await validation();

    if (validated) {
      // Passed validation
      setAd({ ...ad, dateUpdated: createCurrentDate() });
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
    props.history.push("/mycars");
  };

  const onChangeSoldStatus = () => {
    setAd({ ...ad, sold: !sold });
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
            <div className="ad-form__section">
              <h2 className="ad-form__section__heading">
                Aditional information
              </h2>
            </div>
            <div className="ad-form__section">
              <h2 className="ad-form__section__heading">
                Features / Equipment
              </h2>
            </div>
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
                      type="number"
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
        <div className="ad-publishing">
          <Spinner />
          <h2> Publishing...</h2>
        </div>
      ) : (
        <AdPublished />
      )}
    </div>
  );
};

export default AdForm;
