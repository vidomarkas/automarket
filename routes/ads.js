const express = require("express");
const router = express.Router();

const Ad = require("../models/Ad");

// Route        GET api/ads/id
// Description  Get particular ad details
// Access       Public
router.get("/:id", async (req, res) => {
  try {
    let ad = await Ad.findById(req.params.id);
    if (!ad) {
      res.status(404).json({ msg: "Ad not found" });
    }
    res.json(ad);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});
// Route        POST api/ads/id
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

    res.json(ad);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
