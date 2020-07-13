const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

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
    throw Error;
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
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     let ad = await Ad.findById(req.params.id);

//     if (!ad) {
//       res.status(404).json({ msg: "Not found" });
//     }
//     //Make sure user owns the ad
//     if (ad.user.toString() !== req.user.id) {
//       return res.status(401).json({ msg: "Not authorized" });
//     }

//     await Ad.findByIdAndRemove(req.params.id);

//     res.json({ msg: "Removed" });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

module.exports = router;
