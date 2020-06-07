const multer = require("multer");

// Specify storage engine
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },

  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

// File validation

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage,
  //limits: { fileSize: 1024 * 1024 },
  fileFilter,
});

module.exports = upload;
