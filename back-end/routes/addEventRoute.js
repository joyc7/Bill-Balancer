const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Event = require("../models/Event.js");

router.post(
  "/",
  // Validation rules
  body("eventName").notEmpty().withMessage("Event name is required"),
  body("Date").notEmpty().withMessage("Date is required"),
  body("Description").notEmpty().withMessage("Description is required"),
  body("Members").notEmpty().withMessage("Members are required"),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("validation passed");

    try {
      const newEvent = new Event({
        name: req.body.eventName,
        date: req.body.Date,
        description: req.body.Description,
        participants: req.body.Members, // an array of User IDs
        expenses: [], // initialize this as empty
      });

      console.log(newEvent);

      const savedEvent = await newEvent.save();

      res.status(201).json({
        status: "Success",
        message: "Event created successfully!",
        data: savedEvent,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "Error",
        message: "Error creating event",
        error: error.message,
      });
    }
  }
);

module.exports = router;
