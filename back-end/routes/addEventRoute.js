const express = require("express");
const router = express.Router();
const Event = require("../models/Event.js");

router.post("/", async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.eventName,
      date: req.body.Date,
      description: req.body.Description,
      participants: req.body.Members, // Assuming this is an array of User IDs
      expenses: [], // initialize this as empty
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      status: "Success",
      message: "Event created successfully!",
      data: savedEvent,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "Error creating event",
      error: error.message,
    });
  }
});

module.exports = router;
