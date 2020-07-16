const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/search", require("./routes/search"));
app.use("/api/getgroup", require("./routes/getgroup"));
app.use("/api/cars", require("./routes/cars"));
app.use("/api/mycars", require("./routes/mycars"));
app.use("/api/mycars/postcodeValidation", require("./routes/mycars"));
app.use("/api/images", require("./routes/images"));
app.use("/api/savedcars", require("./routes/savedcars"));
app.use("/api/savedcars/inc", require("./routes/savedcars"));
app.use("/api/savedcars/dec", require("./routes/savedcars"));

// Serve static assets in production

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
