const express = require("express");
const router = express.Router();

const Ad = require("../models/Ad");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// Route        GET api/ads
// Description  Get all ads
// Access       Public
router.get("/", async (req, res) => {
  try {
    //  Leave this for implementing search by some criteria
    const allAds = await Ad.find({}).sort({
      date: -1,
    });
    res.json({ allAds });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error serving ads");
  }
});

module.exports = router;
