import React, { useState, useContext, useEffect } from "react";
import carMakes from "../../../assets/carMakes.json";
import AlertContext from "../../../context/alert/alertContext";
import AdContext from "../../../context/ad/adContext";
import Alerts from "../../layout/Alerts";
import Spinner from "../../layout/Spinner";
import "./AdForm.scss";
import AdPublished from "./AdPublished";
import AdUploader from "./AdUploader";

const AdForm = (props) => {
  const adContext = useContext(AdContext);
  const alertContext = useContext(AlertContext);
  const {
    postAd,
    updateAd,
    uploadImage,
    current,
    clearCurrent,
    currentImg,
  } = adContext;
  const { setAlert } = alertContext;

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
  const [emptyFields, setEmptyFields] = useState([]);

  const {
    make,
    model,
    dateManufactured,
    bodyType,
    fuelType,
    gearbox,
    doors,
    damage,
    steeringWheel,
    color,
    price,
    engineCapacity,
    power,
    VINnumber,
    mileage,
    description,
    phoneNumber,
    powerUnit,
    mileageUnit,
    postcode,
    imageURL,
    image,
    regNo,
    featured,
    sold,
    dateUpdated,
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

  // Ad published, redirecting to /myads
  useEffect(() => {
    if (published && !publishing) {
      const timer = setTimeout(() => {
        props.history.push("/myads");
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
    const emptyFieldsCopy = emptyFields.slice();
    const index = emptyFields.indexOf(e.target.name);
    if (index !== -1) {
      emptyFieldsCopy.splice(index, 1);
      setEmptyFields([...emptyFieldsCopy]);
    }
  };

  // On change in image upload input, update state
  const onImageSelect = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.files[0] });
  };

  const onCheck = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.checked });
  };

  const fieldValidation = () => {
    let failedFields = [];
    // Object of required fields
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

    const showFieldError = () => {
      setAlert("Please enter required fields", "danger");
      for (let field in reqFields) {
        if (reqFields[field] === "") {
          failedFields.push(field);
        }
      }
      setEmptyFields([...failedFields]);
    };

    if (Object.values(reqFields).some((field) => field === "")) {
      showFieldError();
      return false;
    } else {
      // passed validation
      return true;
    }
  };

  const createCurrentDate = () => {
    const date = new Date();
    return date.toISOString();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAd({ ...ad, dateUpdated: createCurrentDate() });
    if (fieldValidation()) {
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
    props.history.push("/myads");
  };

  const onChangeSoldStatus = () => {
    setAd({ ...ad, sold: !sold });
  };

  const yearManufactured = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    const years = [];
    for (let i = 1900; i <= thisYear; i++) {
      years.unshift(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
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
            <div className="ad-form__section">
              <h2 className="ad-form__section__heading">Main information</h2>
              <div className="ad-form__group">
                <div className="ad-form__field">
                  <label htmlFor="make" className="ad-form__field__label">
                    <span>
                      Make
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <select
                      name="make"
                      onChange={onChange}
                      value={make}
                      className={
                        emptyFields.indexOf("make") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    >
                      <option value="">--</option>
                      {carMakes.map((brand) => (
                        <option key={brand.name} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="ad-form__field">
                  <label htmlFor="model" className="ad-form__field__label">
                    <span>
                      Model
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <select
                      name="model"
                      onChange={onChange}
                      value={model}
                      className={
                        emptyFields.indexOf("model") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    >
                      <option value="">--</option>
                      {carMakes.map((brand) =>
                        brand.name === make
                          ? brand.models.map((model) => (
                              <option key={model.name} value={model.name}>
                                {model.name}
                              </option>
                            ))
                          : null
                      )}
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label
                    htmlFor="dateManufactured"
                    className="ad-form__field__label"
                  >
                    <span>
                      Date of manufacture
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <select
                      onChange={onChange}
                      value={dateManufactured}
                      name="dateManufactured"
                      className={
                        emptyFields.indexOf("dateManufactured") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    >
                      <option value="">--</option>
                      {yearManufactured()}
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="regNo" className="ad-form__field__label">
                    <span>
                      Registration number
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <input
                      type="text"
                      onChange={onChange}
                      value={regNo}
                      name="regNo"
                      className={
                        emptyFields.indexOf("regNo") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="ad-form__group">
                <div className="ad-form__field">
                  <label htmlFor="bodyType" className="ad-form__field__label">
                    Body type
                    <select
                      onChange={onChange}
                      value={bodyType}
                      size="5"
                      name="bodyType"
                      className="ad-form__field__input ad-form__field__input--multi"
                    >
                      <option value="saloon">Saloon</option>
                      <option value="estate">Estate</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="mpv">MPV / minivan</option>
                      <option value="suv">SUV / off-road</option>
                      <option value="coupe">Coupe</option>
                      <option value="commercial">Commercial</option>
                      <option value="convertible">Convertible</option>
                      <option value="limousine">Limousine</option>
                      <option value="pickUp">Pick-up</option>
                      <option value="passengerVan">Passenger van</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="fuelType" className="ad-form__field__label">
                    Fuel type
                    <select
                      onChange={onChange}
                      value={fuelType}
                      size="5"
                      name="fuelType"
                      className="ad-form__field__input ad-form__field__input--multi"
                    >
                      <option value="diesel">Diesel</option>
                      <option value="petrol">Petrol</option>
                      <option value="petrol/lpg">Petrol / LPG</option>
                      <option value="petrol/electricity">
                        Petrol / electricity
                      </option>
                      <option value="electricity">Electricity</option>
                      <option value="diesel/electricity">
                        Diesel / electricity
                      </option>
                      <option value="bioethanol">Bioethanol (E85)</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="gearbox" className="ad-form__field__label">
                    Gearbox
                    <select
                      onChange={onChange}
                      value={gearbox}
                      size="2"
                      name="gearbox"
                      className="ad-form__field__input ad-form__field__input--multi"
                    >
                      <option value="manual">Manual</option>
                      <option value="auto">Auto</option>
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="doors" className="ad-form__field__label">
                    Number of doors
                    <select
                      name="doors"
                      onChange={onChange}
                      value={doors}
                      size="3"
                      className="ad-form__field__input ad-form__field__input--multi"
                    >
                      <option value="4/5">4/5</option>
                      <option value="2/3">2/3</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="ad-form__group">
                <div className="ad-form__field">
                  <label htmlFor="damage" className="ad-form__field__label">
                    Damage
                    <select
                      name="damage"
                      onChange={onChange}
                      value={damage}
                      className="ad-form__field__input"
                    >
                      <option value="No damage">No damage</option>
                      <option value="Crashed">Crashed</option>
                      <option value="Fire damage">Fire / burn</option>
                      <option value="Gearbox damage">Gearbox damage</option>
                      <option value="Damage by hail">Damage by hail</option>
                      <option value="Water damage">Water / flood</option>
                      <option value="Engine damage">Engine damage</option>
                      <option value="Other damage">Other major damage</option>
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label
                    htmlFor="steeringWheel"
                    className="ad-form__field__label"
                  >
                    Steering wheel
                    <select
                      name="steeringWheel"
                      onChange={onChange}
                      value={steeringWheel}
                      className="ad-form__field__input"
                    >
                      <option value="RHD">Right hand drive (RHD)</option>
                      <option value="LHD">Left hand drive (LHD)</option>
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="color" className="ad-form__field__label">
                    <span>
                      Color
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <select
                      name="color"
                      onChange={onChange}
                      value={color}
                      className={
                        emptyFields.indexOf("color") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    >
                      <option value="">--</option>
                      <option value="white">White</option>
                      <option value="yellow">Yellow / gold</option>
                      <option value="black">Black</option>
                      <option value="varied">Varied</option>
                      <option value="blue">Blue</option>
                      <option value="orange">Orange</option>
                      <option value="gray">Gray</option>
                      <option value="red">Red / crimson</option>
                      <option value="brown">Brown / beige</option>
                      <option value="violet">Violet</option>
                      <option value="green">Green / olive</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="price" className="ad-form__field__label">
                    <span>
                      Price, £
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <input
                      type="number"
                      name="price"
                      onChange={onChange}
                      value={price}
                      className={
                        emptyFields.indexOf("price") === -1
                          ? "ad-form__field__input"
                          : "ad-form__field__input ad-form__field__input--failed"
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="ad-form__group">
                <div className="ad-form__field">
                  <label
                    htmlFor="engineCapacity"
                    className="ad-form__field__label"
                  >
                    Engine capacity, cc
                    <input
                      type="number"
                      name="engineCapacity"
                      onChange={onChange}
                      placeholder="E.g. 1400"
                      value={engineCapacity}
                      className="ad-form__field__input"
                    />
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="power" className="ad-form__field__label">
                    Power
                    <div className="ad-form__field__input--split">
                      <input
                        type="number"
                        name="power"
                        onChange={onChange}
                        value={power}
                        className="ad-form__field__input"
                      />
                      <select
                        name="powerUnit"
                        onChange={onChange}
                        value={powerUnit}
                        className="ad-form__field__input"
                      >
                        <option value="hp">HP</option>
                        <option value="kw">kW</option>
                      </select>
                    </div>
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="VINnumber" className="ad-form__field__label">
                    VIN number
                    <input
                      type="text"
                      name="VINnumber"
                      onChange={onChange}
                      value={VINnumber}
                      className="ad-form__field__input"
                      placeholder="E.g. WAUZZZF49HA036784"
                    />
                  </label>
                </div>
                <div className="ad-form__field">
                  <label htmlFor="mileage" className="ad-form__field__label">
                    <span>
                      Mileage
                      <span className="ad-form__field__label--required">*</span>
                    </span>
                    <div className="ad-form__field__input--split">
                      <input
                        type="number"
                        name="mileage"
                        onChange={onChange}
                        value={mileage}
                        className={
                          emptyFields.indexOf("mileage") === -1
                            ? "ad-form__field__input"
                            : "ad-form__field__input ad-form__field__input--failed"
                        }
                      />
                      <select
                        name="mileageUnit"
                        onChange={onChange}
                        value={mileageUnit}
                        className="ad-form__field__input"
                      >
                        <option value="mi">Mi</option>
                        <option value="km">Km</option>
                      </select>
                    </div>
                  </label>
                </div>
              </div>
            </div>
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
                    The more informative your ad is, the less questions you will
                    be asked.
                  </p>
                  <p>
                    Adverts with interesting comments can be featured on
                    automarket facebook page.
                  </p>
                </div>
              </div>
            </div>
            <AdUploader onImageSelect={onImageSelect} imageURL={imageURL} />

            <div className="ad-form__section">
              <h2 className="ad-form__section__heading">Extra services</h2>
              <p className="ad-form__section__text">
                {" "}
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
                        emptyFields.indexOf("phoneNumber") === -1
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
                        emptyFields.indexOf("postcode") === -1
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
                className="btn btn-primary ad-form__controls__btn--mr"
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
