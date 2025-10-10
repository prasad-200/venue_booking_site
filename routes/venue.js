const express = require("express");
const {
  requireSignIn,
  dealerMiddleware,
} = require("../common_middlewares/index");
const {
  getAllVenues,
  createVenue,
  getVenueByVenueId,
  getAllVenuesByOwnerId,
  checkAvailability,
} = require("../controllers/venue");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2; // <-- import cloudinary

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "venues", // optional folder in Cloudinary
    format: async (req, file) => "jpg", // convert all uploads to jpg
    public_id: (req, file) => shortid.generate() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

// Routes
router.post(
  "/create-venue",
  requireSignIn,
  dealerMiddleware,
  upload.array("venuePicture"),
  createVenue
);
router.get("/venue/:venueId", getVenueByVenueId);
router.get("/venues/:ownerId", getAllVenuesByOwnerId);
router.get("/all-venues", getAllVenues);
router.get("/available", checkAvailability);

module.exports = router;
