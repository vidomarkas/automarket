const express = require("express");
const router = express.Router();

const Ad = require("../models/Ad");

// Route        GET api/cars/id
// Description  Get ad details
// Access       Public
router.get("/:id", async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ msg: "Ad not found" });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ msg: "Error getting the ad details" });
  }
});

// Route        POST api/cars/id
// Description  Track how many views the ad has
// Access       Public
router.post("/:id", async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ msg: "Ad not found" });
    }

    ad = await Ad.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { seenCount: 1 },
      },
      { new: true }
    );

    res.json(ad.seenCount);
  } catch (error) {
    res.status(500).json({ msg: "Error updating the ad" });
  }
});

module.exports = router;
