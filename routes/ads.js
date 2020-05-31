const express = require("express");
const router = express.Router();

// Route        GET api/ads
// Description  Get all ads
// Access       Public
router.get("/", (req, res) => {
  res.send("Show all ads");
});

// Route        POST api/ads
// Description  Create an ad
// Access       Private
router.post("/", (req, res) => {
  res.send("Create an ad");
});

// Route        PUT api/ads/:id
// Description  Edit an ad
// Access       Private
router.put("/:id", (req, res) => {
  res.send("Edit an ad");
});

// Route        DELETE api/ads
// Description  Delete an ad
// Access       Private
router.delete("/:id", (req, res) => {
  res.send("Delete an ad");
});

module.exports = router;
