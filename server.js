const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  // Options: res.send; res.json; res.sendFile
  res.json({ msg: "Welcome to automarket" });
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ads", require("./routes/ads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
