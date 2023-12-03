const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {Settlement} = require("../models/Settlement.js")

router.post(
    "/:settlementId",

    async (req, res) => {
    
    /*
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    */

      try {
        const settlementId  = req.params.settlementId;
        const status = req.body.status;
        console.log(status);

      const updatedSettlement = await Settlement.findByIdAndUpdate(
        settlementId,
        { status },
        { new: true }
      );

      if(!updatedSettlement){
        return res.status(404).json({ message: "Settlement not found" });
      }
        // Send a success response
        res.status(200).json({
          message: "Settlements updated successfully",
          data: updatedSettlement,
        });
      } catch (error) {
        // Handle any errors that occur during saving to database
        console.error(error);
        res.status(500).json({ status: "Error", message: error.message });
      }
    }
  );
  

module.exports = router;