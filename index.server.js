const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

// environment variables
env.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middlewares
app.use(cors());
app.use(express.json());

// Routes
const dealerAuthRoutes = require("./routes/dealer.auth");
const clientAuthRoutes = require("./routes/client.auth");
const venueRoutes = require("./routes/venue");
const dealsRoutes = require("./routes/deal");

// Keep existing route structure
app.use("/api", dealerAuthRoutes);
app.use("/api", clientAuthRoutes);
app.use("/api", venueRoutes);
app.use("/api", dealsRoutes);

// MongoDB connection
const connectDB = (dburl) => {
  return mongoose
    .connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    });
};

// Start server
const start = async () => {
  try {
    await connectDB(process.env.dburl);
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
