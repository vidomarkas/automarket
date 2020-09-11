const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad");

// Route        POST api/getgroup
// Description  Search all ads with criteria
// Access       Public
router.post("/", async (req, res) => {
  const type = req.body.type;

  const createTypeObj = (type) => {
    switch (type) {
      case "popular":
        typeObj.find = { sold: false };
        typeObj.sort = { seenCount: -1 };
        break;
      case "new":
        typeObj.find = { mileage: { $lte: 500 }, sold: false };
        typeObj.sort = { dateUpdated: -1 };
        break;
      case "expensive":
        typeObj.find = { sold: false };
        typeObj.sort = {
          price: -1,
        };
        break;
      default:
        typeObj.find = { featured: true, sold: false };
        typeObj.sort = {
          dateUpdated: -1,
        };
    }
  };
  const typeObj = {};
  createTypeObj(type);

  try {
    const result = await Ad.find(typeObj.find).sort(typeObj.sort).limit(15);

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
