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

// Route        GET api/ads/id
// Description  Get particular ad details
// Access       Public
router.get("/:id", async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);

    if (!ad) {
      res.status(404).json({ msg: "Advertisement not found" });
    }
    res.json({ ad });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
