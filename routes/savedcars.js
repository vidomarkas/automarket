const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Ad = require("../models/Ad");
const auth = require("../middleware/auth");

// Route        GET api/savedcars/details
// Description  Get saved ads list of the user
// Access       Private
router.get("/details", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const getSavedAdDetails = async (id) => {
      const savedAdDetails = await Ad.findById(id);
      return savedAdDetails;
    };

    const adDetails = await Promise.all(
      user.savedAds.map((id) => {
        return getSavedAdDetails(id);
      })
    );
    res.json(adDetails);
  } catch (error) {
    res.status(500).json({ msg: "Error geting the saved ads details" });
  }
});

// Route        GET api/savedcars/list
// Description  Get saved ads list of ids
// Access       Private
router.get("/list", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    res.json(user.savedAds);
  } catch (error) {
    res.status(500).json({ msg: "Error geting the saved ads list" });
  }
});

// Route        POST api/savedcars
// Description  Save an ad to favorites
// Access       Private

router.post("/", auth, async (req, res) => {
  const id = req.body.id;
  console.log("id", id);

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { savedAds: id },
      },
      { new: true }
    );
    Ad.findByIdAndUpdate(
      id,
      {
        $inc: { savedCount: 1 },
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
    Ad.findByIdAndUpdate(
      AdID,
      {
        $inc: { savedCount: -1 },
      },
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

// router.post("/inc", auth, async (req, res) => {
//   const AdID = req.body.id;

//   try {
//     ad = await Ad.findByIdAndUpdate(
//       AdID,
//       {
//         $inc: { savedCount: 1 },
//       },
//       { new: true }
//     );

//     res.json(ad.savedCount);
//   } catch (error) {
//     res.status(500).json({ msg: "Error saving the ad" });
//   }
// });
// Route        POST api/savedcars/dec
// Description  Decrement the counter of saves for ad
// Access       Private

// router.post("/dec", auth, async (req, res) => {
//   const AdID = req.body.id;

//   try {
//     ad = await Ad.findByIdAndUpdate(
//       AdID,
//       {
//         $inc: { savedCount: -1 },
//       },
//       { new: true }
//     );

//     res.json(ad.savedCount);
//   } catch (error) {
//     res.status(500).json({ msg: "Error removing the ad" });
//   }
// });

module.exports = router;
