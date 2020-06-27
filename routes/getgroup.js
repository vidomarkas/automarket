const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");
const multiPropsFilter = require("../utils/multiPropsFilter");

// Route        POST api/ads
// Description  Search all ads with criteria
// Access       Public
router.post("/", async (req, res) => {
  try {
    const featuredAds = await Ad.find({ featured: true }).sort({
      date: -1,
    });

    res.json(featuredAds);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error serving ads");
  }
});

module.exports = router;
