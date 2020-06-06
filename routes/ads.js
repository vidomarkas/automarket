const express = require("express");
const router = express.Router();
const multiPropsFilter = require("../utils/multiPropsFilter");
const Ad = require("../models/Ad");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// Route        POST api/ads
// Description  Search all ads with criteria
// Access       Public
router.post("/", async (req, res) => {
  try {
    const allAds = await Ad.find({}).sort({
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
