const express = require("express");
const router = express.Router();
const upload = require("../multer");
const cloudinary = require("../cloudinary");
const fs = require("fs");
const auth = require("../middleware/auth");

//const cloudinary = require("cloudinary").v2;

// Route        POST api/images
// Description  Upload image
// Access       Private
router.post("/", [auth, upload.array("image")], async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "automarket");

  try {
    const urls = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    res
      .status(200)
      .json({ message: "Images uploaded successfully", data: urls });
  } catch (error) {
    res.status(405).json({ err: error });
  }
});

module.exports = router;
