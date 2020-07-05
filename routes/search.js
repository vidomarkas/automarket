const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");
const multiPropsFilter = require("../utils/multiPropsFilter");

// Route        POST api/ads
// Description  Search all ads with criteria
// Access       Public
router.post("/", async (req, res) => {
  try {
    const allAds = await Ad.find({ sold: false }).sort({
      date: -1,
    });
    const criteria = req.body.criteria;
    const filteredAds = await multiPropsFilter(allAds, criteria);
    res.json(filteredAds);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error serving ads");
  }
});

module.exports = router;
