const express = require("express");
const router = express.Router();

const Ad = require("../models/Ad");

// Route        GET api/cars/id
// Description  Get ad details, increment seenCount
// Access       Public
router.get("/:id", async (req, res) => {
  try {
    let ad = await Ad.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { seenCount: 1 },
      },
      { new: true }
    );
    if (!ad) {
      res.status(404).json({ msg: "Ad not found" });
    } else {
      res.json(ad);
    }
  } catch (error) {
    res.status(500).json({ msg: "Error getting the ad details" });
  }
});

module.exports = router;
