const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { Expense } = require("../models/Expense.js");
const { Settlement } = require("../models/Settlement.js");
const Event = require("../models/Event");

router.post(
  "/",
  // validation rules
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("totalAmount").isNumeric().withMessage("Amount should be a number"),
    body("date").not().isEmpty().withMessage("Date is required"),
    body("paidBy").not().isEmpty().withMessage("Person who paid is required"),
    // Add other validation rules as needed
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("validation passed");

    try {

      let splitDetailsWithSettlements = [];
      // Create Settlement objects
      for (const split of req.body.peopleSplit) {
        if (split.user !== req.body.paidBy) {
          let newSettlement = new Settlement({
            status: false,
            amount: split.amount,
            settleTo: req.body.paidBy,
            settleFrom: split.user,
            event: req.body.event,
          });
          console.log(newSettlement);
          await newSettlement.save();
          splitDetailsWithSettlements.push({ user: split.user, settlement: newSettlement._id });
        }
      }

      // Create a new Expense object
      const newExpense = new Expense({
        name: req.body.name,
        description: req.body.description,
        totalAmount: req.body.totalAmount,
        date: new Date(req.body.date),
        paidBy: req.body.paidBy,
        splitDetails: splitDetailsWithSettlements,
        event: req.body.event,
      });

      console.log(newExpense);

      // Save the Expense object to the database
      const event = await Event.findById(req.body.event);
      if (!event) {
        return res
          .status(404)
          .json({ status: "Error", message: "Event not found" });
      }

      // Add the expense ID to the event's expenses list
      // ? no "savedExpense" defined, maybe "newExpense"?
      const savedExpense = await newExpense.save();
      event.expenses.push(savedExpense._id);
      await event.save();

      // Send a success response
      res.status(201).json({
        status: "Success",
        message: "Expense added successfully",
        data: newExpense,
      });
    } catch (error) {
      // Handle any errors that occur during saving to database
      console.log(error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }
);

module.exports = router;