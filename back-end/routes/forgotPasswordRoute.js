const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const username = req.body.username;
  const newPassword = req.body.newPassword;
  const email = req.body.email;

  try {
    const user = await User.findOne({
      $and: [{ $or: [{ username: username }, { email: email }] }],
    });

    console.log(user);

    if (!user) {
      console.error(`User not found.`);
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error(`Error updating password: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;
