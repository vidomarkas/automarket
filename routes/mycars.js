const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const Ad = require("../models/Ad");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const getCoords = require("../utils/getCoords");

// Route        GET api/myads
// Description  Get my ads
// Access       Private
router.get("/", auth, async (req, res) => {
  try {
    const myads = await Ad.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(myads);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// Route        POST api/myads
// Description  Create an ad
// Access       Private

router.post(
  "/",
  [
    auth,
    [
      check("make", "Make is required. For example: Audi").not().isEmpty(),
      check("model", "Model is required. For example: A4").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log("errors:", errors.errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      engineCapacity,
      power,
      VINnumber,
      mileage,
      dateAdded,
      description,
      price,
      phoneNumber,
      imageURL,
      postcode,
      regNo,
      featured,
      sold,
      dateUpdated,
    } = req.body;

    const coords = await getCoords(postcode);
    try {
      const newAd = new Ad({
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
        engineCapacity,
        power,
        VINnumber,
        mileage,
        dateAdded,
        description,
        price,
        phoneNumber,
        imageURL,
        postcode,
        regNo,
        featured,
        sold,
        dateUpdated,
        user: req.user.id,
        coords,
      });
      const ad = await newAd.save();

      res.json(ad);
    } catch (error) {
      console.error(error.message);
      res.status(500).json(error.message);
    }
  }
);

// Route        PUT api/myads/:id
// Description  Edit an ad
// Access       Private

router.put("/:id", auth, async (req, res) => {
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
    engineCapacity,
    power,
    VINnumber,
    mileage,
    dateAdded,
    description,
    price,
    phoneNumber,
    postcode,
    regNo,
    imageURL,
    featured,
    sold,
    dateUpdated,
  } = req.body;
  const coords = await getCoords(postcode);

  // Build ad body

  const adFields = {};
  if (make) adFields.make = make;
  if (model) adFields.model = model;
  if (dateManufactured) adFields.dateManufactured = dateManufactured;
  if (bodyType) adFields.bodyType = bodyType;
  if (fuelType) adFields.fuelType = fuelType;
  if (gearbox) adFields.gearbox = gearbox;
  if (doors) adFields.doors = doors;
  if (damage) adFields.damage = damage;
  if (steeringWheel) adFields.steeringWheel = steeringWheel;
  if (color) adFields.color = color;
  if (engineCapacity) adFields.engineCapacity = engineCapacity;
  if (power) adFields.power = power;
  if (VINnumber) adFields.VINnumber = VINnumber;
  if (mileage) adFields.mileage = mileage;
  if (dateAdded) adFields.dateAdded = dateAdded;
  if (description) adFields.description = description;
  if (price) adFields.price = price;
  if (phoneNumber) adFields.phoneNumber = phoneNumber;
  if (postcode) adFields.postcode = postcode;
  if (description) adFields.description = description;
  if (imageURL) adFields.imageURL = imageURL;
  if (regNo) adFields.regNo = regNo;
  if (dateUpdated) adFields.dateUpdated = dateUpdated;
  if (featured !== undefined) adFields.featured = featured;
  if (sold !== undefined) adFields.sold = sold;
  if (await coords) adFields.coords = coords;

  try {
    let ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ msg: "Ad not found" });
    }

    //Make sure user owns the ad
    if (ad.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    ad = await Ad.findByIdAndUpdate(
      req.params.id,
      {
        $set: adFields,
      },
      { new: true }
    );

    res.json(ad);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Route        DELETE api/myads
// Description  Delete an ad
// Access       Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);

    if (!ad) {
      res.status(404).json({ msg: "Not found" });
    }
    //Make sure user owns the ad
    if (ad.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Ad.findByIdAndRemove(req.params.id);

    res.json({ msg: "Removed" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Route        GET api/myads/postcodeValidation
// Description  Validate postcode
// Access       Private
router.get("/postcodeValidation/:postcode", auth, async (req, res) => {
  const postcode = req.params.postcode;
  try {
    const response = await axios.get(
      `https://api.postcodes.io/postcodes/${postcode}/validate`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error validating postcode" });
  }
});

module.exports = router;
