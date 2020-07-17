const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ad = require("../models/Ad");
const auth = require("../middleware/auth");

// Route        GET api/savedcars
// Description  Get saved ads list of the user
// Access       Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log("Saved Ads:", user.savedAds);
    res.json(user.savedAds);
  } catch (error) {
    res.status(500).json({ msg: "Error geting the saved ads list" });
  }
});

// Route        POST api/savedcars
// Description  Save an ad to favorites
// Access       Private

router.post("/", auth, async (req, res) => {
  const AdID = req.body.AdID;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { savedAds: AdID },
      },
      { new: true }
    );

    res.json(user.savedAds);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ msg: "Error occured saving the ad, try again later" });
  }
});

// Route        DELETE api/savedcars
// Description  Remove an ad from favorites
// Access       Private
router.delete("/:id", auth, async (req, res) => {
  const AdID = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { savedAds: AdID } },
      { new: true }
    );
    res.json(user.savedAds);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ====== Increment / Decrement / Get ad's counter ===========

// Route        POST api/savedcars/inc
// Description  Increment the counter of saves for ad
// Access       Private

router.post("/inc", auth, async (req, res) => {
  const AdID = req.body.id;

  try {
    ad = await Ad.findByIdAndUpdate(
      AdID,
      {
        $inc: { savedCount: 1 },
      },
      { new: true }
    );
    console.log("inc count", ad.savedCount);
    res.json(ad.savedCount);
  } catch (error) {
    res.status(500).json({ msg: "Error saving the ad" });
  }
});
// Route        POST api/savedcars/dec
// Description  Decrement the counter of saves for ad
// Access       Private

router.post("/dec", auth, async (req, res) => {
  const AdID = req.body.id;

  try {
    ad = await Ad.findByIdAndUpdate(
      AdID,
      {
        $inc: { savedCount: -1 },
      },
      { new: true }
    );
    console.log("decrement count", ad.savedCount);
    res.json(ad.savedCount);
  } catch (error) {
    res.status(500).json({ msg: "Error removing the ad" });
  }
});

module.exports = router;
