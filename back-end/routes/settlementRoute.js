const express = require("express");
const router = express.Router();
const { Settlement } = require("../models/Settlement.js");

// Route to get settlements for a specific user as 'settleFrom'
router.get("/from/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const settlements = await Settlement.find({ settleFrom: userId })
      .populate("settleTo")
      .populate("event");

    res.status(200).json(settlements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching settlements", error: error });
  }
});

router.get("/from/:userId1/to/:userId2", async (req, res) => {
  try {
    const userId1 = req.params.userId1;
    const userId2 = req.params.userId2;

    const settlements = await Settlement.find({
      settleFrom: userId1,
      settleTo: userId2,
    });

    res.status(200).json(settlements);
  } catch (error) {
    console.error("Error fetching settlements:", error);
    res
      .status(500)
      .json({ message: "Error fetching settlements", error: error });
  }
});

module.exports = router;
