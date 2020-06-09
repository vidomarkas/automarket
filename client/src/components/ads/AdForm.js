import React, { useState, useContext, useEffect } from "react";
import carMakes from "../../assets/carMakes.json";
import AdContext from "../../context/ad/adContext";
import AlertContext from "../../context/alert/alertContext";
import "./AdForm.scss";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

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
    loading,
  } = adContext;
  const { setAlert } = alertContext;

  const initialState = {
    make: "AC",
    model: "Other",
    dateManufactured: "2003",
    bodyType: "saloon",
    fuelType: "diesel",
    gearbox: "manual",
    doors: "4/5",
    damage: "noDamage",
    steeringWheel: "RHD",
    color: "red",
    price: "555",
    engineCapacity: "",
    power: "1000",
    powerUnit: "hp",
    VINnumber: "",
    mileage: 1000000,
    mileageUnit: "mi",
    description: "testing",
    phoneNumber: 555555555,
    featured: false,
    sold: false,
    postcode: "DA550DA",
    image: "",
    imageURL: null,
  };

  const [ad, setAd] = useState(initialState);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

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
    //featured,
    //sold,
  } = ad;

  // Determine whether the ad is being updated or it is a new ad
  useEffect(() => {
    console.log(
      "1 Determine whether the ad is being updated or it is a new ad"
    );
    if (current !== null) {
      console.log("current was not null!", current);
      setAd(current);
    } else {
      console.log("current was null", current);
      setAd(initialState);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (publishing && currentImg !== null) {
      console.log("2.publishing && currentImg !== null");
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
      console.log("3.publishing && imageURL !== null");
      if (current === null) {
        postAd(ad);
        console.log("Posting ad!");
      } else {
        updateAd(ad);
        console.log("Updating ad!");
      }
      setPublishing(false);
      setPublished(true);
      setAd(initialState);
      clearCurrent();
    }
  }, [imageURL, publishing]);

  // Ad published, redirecting to /myads
  useEffect(() => {
    if (published && !publishing) {
      console.log("4 (published && !publishing");
      const timer = setTimeout(() => {
        props.history.push("/myads");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [published, publishing]);

  // On change in inputs, update ad state
  const onChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (image) {
      console.log("5 image effect ;  setAd({ ...ad, imageURL: null });");
      setAd({ ...ad, imageURL: null });
      console.log("from effect ad :>> ", ad);
    }
  }, [image]);

  // On change in image upload input, update state
  const onImageSelect = (e) => {
    console.log("ad in image select :>> ", ad);
    setAd({ ...ad, [e.target.name]: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //validate inputs (check if they're not empty)
    if (
      make === "" ||
      model === "" ||
      mileage === "" ||
      dateManufactured === "" ||
      phoneNumber === "" ||
      postcode === "" ||
      price === "" ||
      color === ""
    ) {
      setAlert("Please enter required fields", "danger");
    } else {
      // passed validation
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
    //setPublished(true);
    setAd(initialState);
    clearCurrent();
    console.log("clicked cancel");
    props.history.push("/myads");
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
    <>
      {!publishing && !published ? (
        <>
          <h1 className="text-primary">
            {current ? "Advert editing" : "New advert"}
          </h1>
          <form
            className="adForm"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <div className="adForm__section">
              <h2 className="adForm__heading">Main information</h2>
              <div className="adForm-group">
                <label htmlFor="make" className="adForm-group--item1">
                  Make
                  <select name="make" onChange={onChange} value={make}>
                    <option value="">--</option>
                    {carMakes.map((brand) => (
                      <option key={brand.name} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="model" className="adForm-group--item1">
                  Model
                  <select name="model" onChange={onChange} value={model}>
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
                <label
                  htmlFor="dateManufactured"
                  className="adForm-group--item1"
                >
                  Date of manufacture
                  <select
                    onChange={onChange}
                    value={dateManufactured}
                    name="dateManufactured"
                  >
                    <option value="">--</option>
                    {yearManufactured()}
                  </select>
                </label>
              </div>
              <div className="adForm-group">
                <label htmlFor="bodyType" className="adForm-group--item2">
                  Body type
                  <select
                    onChange={onChange}
                    value={bodyType}
                    size="5"
                    name="bodyType"
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
                <label htmlFor="fuelType" className="adForm-group--item2">
                  Fuel type
                  <select
                    onChange={onChange}
                    value={fuelType}
                    size="5"
                    name="fuelType"
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
                <label htmlFor="gearbox" className="adForm-group--item2">
                  Gearbox
                  <select
                    onChange={onChange}
                    value={gearbox}
                    size="2"
                    name="gearbox"
                  >
                    <option value="manual">Manual</option>
                    <option value="auto">Auto</option>
                  </select>
                </label>
                <label htmlFor="doors" className="adForm-group--item2">
                  Number of doors
                  <select
                    name="doors"
                    onChange={onChange}
                    value={doors}
                    size="3"
                  >
                    <option value="4/5">4/5</option>
                    <option value="2/3">2/3</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="adForm-group">
                <label htmlFor="damage" className="adForm-group--item2">
                  Damage
                  <select name="damage" onChange={onChange} value={damage}>
                    <option value="noDamage">No damage</option>
                    <option value="crashedDamage">Crashed</option>
                    <option value="fireDamage">Fire / burn</option>
                    <option value="gearboxDamage">Gearbox damage</option>
                    <option value="hailDamage">Damage by hail</option>
                    <option value="waterDamage">Water / flood</option>
                    <option value="hailDamage">Engine damage</option>
                    <option value="otherDamage">Other major damage</option>
                  </select>
                </label>
                <label htmlFor="steeringWheel" className="adForm-group--item2">
                  Steering wheel
                  <select
                    name="steeringWheel"
                    onChange={onChange}
                    value={steeringWheel}
                  >
                    <option value="RHD">Right hand drive (RHD)</option>
                    <option value="LHD">Left hand drive (LHD)</option>
                  </select>
                </label>
                <label htmlFor="color" className="adForm-group--item2">
                  Color
                  <select name="color" onChange={onChange} value={color}>
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
                <label htmlFor="price" className="adForm-group--item2">
                  Price, £
                  <input
                    type="number"
                    name="price"
                    onChange={onChange}
                    value={price}
                  />
                </label>
              </div>
              <div className="adForm-group">
                <label htmlFor="engineCapacity" className="adForm-group--item2">
                  Engine capacity, cc
                  <input
                    type="number"
                    name="engineCapacity"
                    onChange={onChange}
                    placeholder="E.g. 1400"
                    value={engineCapacity}
                  />
                </label>
                <label htmlFor="power" className="adForm-group--item2">
                  Power
                  <input
                    type="number"
                    name="power"
                    onChange={onChange}
                    value={power}
                  />
                  <select
                    name="powerUnit"
                    onChange={onChange}
                    value={powerUnit}
                  >
                    <option value="hp">HP</option>
                    <option value="kw">kW</option>
                  </select>
                </label>
                <label htmlFor="VINnumber" className="adForm-group--item2">
                  VIN number
                  <input
                    type="text"
                    name="VINnumber"
                    onChange={onChange}
                    value={VINnumber}
                  />
                </label>
                <label htmlFor="mileage" className="adForm-group--item2">
                  Mileage
                  <input
                    type="number"
                    name="mileage"
                    onChange={onChange}
                    value={mileage}
                  />
                  <select
                    name="mileageUnit"
                    onChange={onChange}
                    value={mileageUnit}
                  >
                    <option value="mi">Mi</option>
                    <option value="km">Km</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="adForm__section">
              <h2 className="adForm__heading">Description</h2>

              <textarea
                name="description"
                cols="20"
                rows="10"
                value={description}
                onChange={onChange}
              ></textarea>
              <div className="description-comments">
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
            <div className="adForm__section">
              <h2 className="adForm__heading">Contact information</h2>
              <label htmlFor="phoneNumber">
                Phone number
                <input
                  type="number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                />
              </label>
              <label htmlFor="postcode">
                Postcode
                <input
                  type="text"
                  name="postcode"
                  value={postcode}
                  onChange={onChange}
                />
              </label>
            </div>
            <label htmlFor="image">
              Upload image
              <input type="file" name="image" onChange={onImageSelect} />
            </label>
            {imageURL && <img src={imageURL} alt="" />}

            <input
              type="submit"
              className="btn btn-primary"
              value={current ? "Update" : "Publish"}
            />
            <input
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              value="Cancel"
            />
          </form>
        </>
      ) : publishing && !published ? (
        <>
          <Spinner />
          <h2> Publishing...</h2>
        </>
      ) : (
        <>
          <h2>Your ad is now published</h2>
          <p>Redirecting to your ads page...</p>
          <Link to="/myads">My ads</Link>
        </>
      )}
    </>
  );
};

export default AdForm;
