const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define a MongoDB schema for polygon data
const polygonSchema = new mongoose.Schema({
  userId: String,
  features: [mongoose.Schema.Types.Mixed],
  crop: [mongoose.Schema.Types.Mixed],
});

const floodSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const finalDatasetSchema = new mongoose.Schema({
  Crop_Names: String,
  Growthh_Stage: Number,
  Avg_Temperature: Number,
  User_Field_Capacity: Number,
  Ideal_Field_Capacity: Number,
  Ideal_Soil_Roughness_Threshold: Number,
  Ideal_Soil_Moisture: Number,
  Min_Months: Number,
  Max_Months: Number,
  Type: String,
  Soil_Roughness: Number,
});

const Polygon = mongoose.model("Polygon", polygonSchema);
const Flood = mongoose.model("Flood", floodSchema);
const FinalDataset = mongoose.model("FinalDataset", finalDatasetSchema);

// Save polygon data and user crop selection
router.post("/savePolygon", async (req, res) => {
  try {
    const { id, data, selectedOption } = req.body;

    // Find existing polygon data based on userId
    const existingPolygon = await Polygon.findOne({ userId: id });

    if (existingPolygon) {
      // Update existing entry
      existingPolygon.features = data;
      existingPolygon.crop.push(selectedOption);

      const updatedPolygon = await existingPolygon.save();

      res
        .status(200)
        .json({ success: true, message: "Polygon data updated successfully" });
    } else {
      // Create a new Polygon document
      const newPolygon = new Polygon({
        userId: id,
        features: data,
        crop: [selectedOption],
      });

      // Save the newPolygon to MongoDB
      const savedPolygon = await newPolygon.save();

      res
        .status(200)
        .json({ success: true, message: "Polygon data saved successfully" });
    }
  } catch (error) {
    console.error("Error saving/updating polygon data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Fetch user polygon data
router.get("/getPolygons/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch polygon data from MongoDB based on userId
    const userPolygons = await Polygon.find({ userId: userId });

    res.status(200).json({ success: true, data: userPolygons });
  } catch (error) {
    console.error("Error fetching polygon data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Fetch user polygon data
router.get("/getFloods", async (req, res) => {
  try {
    // Fetch polygon data from MongoDB based on userId
    const floods = await Flood.find({});
    console.log("ffloods: ", floods);
    res.status(200).json(...floods);
  } catch (error) {
    console.error("Error fetching polygon data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Fetch user polygon data
router.get("/finalDataset/crops/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch polygon data from MongoDB based on userId
    const userPolygons = await Polygon.findOne({ userId: userId });

    // const { Crop_Name } = req.body;

    // Validate if Crop_Name is provided
    if (!userPolygons) {
      return res.status(422).json({ error: "User polygons not found" });
    }

    console.log("user polygons: ", userPolygons)
    // Fetch records based on the provided Crop_Name
    const records = await FinalDataset.find({
      Crop_Names: { $in: userPolygons.crop.map((e) => e?.crop) },
    });
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching polygon data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
