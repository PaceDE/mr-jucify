const express = require("express");
const Activity = require("../models/Activity");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();


// Activity Schema


router.post("/", async (req, res) => {
  try {
    const { action, entity } = req.body;

    // Check if activity count exceeds 25, and delete the oldest if necessary
    const activityCount = await Activity.countDocuments(); // Get the count of activities

    if (activityCount >= 25) {
      // Delete the oldest activity
      // Find the oldest document by sorting and then deleting it
      const oldestActivity = await Activity.findOne().sort({ timestamp: 1 });

      if (oldestActivity) {
        await Activity.findByIdAndDelete(oldestActivity._id);
      }
    }

    // Create a new activity
    const newActivity = new Activity({
      action,
      entity,
    });

    // Save the new activity
    await newActivity.save();
    res.status(200).send("Activity saved successfully!");
  } catch (err) {
    res.status(500).send("Error saving activity");
  }
});

// Route to get recent activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 });// Fetch latest 10 activities
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).send("Error fetching activities");
  }
});

module.exports=router;

