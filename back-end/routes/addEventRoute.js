const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    const response = {
        status: "Success",
        message: "The Data is Updated!",
        data: {
          eventName: req.body.eventName,
          Date: req.body.Date,
          Description: req.body.Description,
          Members: req.body.Members,   
        },
      };
      res.json(response);
  });

module.exports = router;