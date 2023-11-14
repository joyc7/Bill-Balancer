const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    // assemble an object with the data we want to send
    const response = {
        status: "Success",
        message: "congratulations on sending us this data!",
        data: {
          name: req.body.name,
          amount: req.body.amount,
          date: req.body.date,
          personPaid: req.body.personPaid,   
          peopleSplit: req.body.peopleSplit, 
          splitMethod: req.body.splitMethod,
          amountDetails: req.body.amountDetails
        },
      };
      // ... then send a response of some kind to client
      res.json(response);
  });

module.exports = router;