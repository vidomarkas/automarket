const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ads", require("./routes/ads"));
app.use("/api/myads", require("./routes/myads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Started server on port ${PORT}`);
});
