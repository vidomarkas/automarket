const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// Route        GET api/savedcars
// Description  Get saved ads
// Access       Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    console.log("Getting saved ads...", user.savedAds);

    res.json(user.savedAds);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// Route        POST api/savedcars
// Description  Save an ad to favorites
// Access       Private

router.post("/", auth, async (req, res) => {
  const AdID = req.body.AdID;
  console.log("Saving ad... Ad id - ", AdID);
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { savedAds: AdID },
      },
      { new: true }
    );

    console.log("Updated: savedAds", user.savedAds);
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
  console.log("AdID is this", AdID);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: { savedAds: AdID } },
      { new: true }
    );
    console.log("REMOVING AD");
    console.log("updatedUser", updatedUser);
    console.log("updatedUser", updatedUser.savedAds);
    console.log("==========================");
    res.json({ msg: "removed" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
