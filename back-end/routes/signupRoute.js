const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");

// router.post("/", async (req, res) => {
//   const response = {
//     status: "Success",
//     message: "We recieved your data!",
//     data: {
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     },
//   };
//   res.json(response);
// });

router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(401).json({
      success: false,
      message: `No username or password supplied.`,
    });
    next();
  }

  try {
    const user = await new User({ username, password }).save();
    console.error(`New user: ${user}`);
    const token = user.generateJWT();
    res.json({
      success: true,
      message: "User saved successfully.",
      token: token,
      username: user.username,
    });
    next();
  } catch (err) {
    console.error(`Failed to save user: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error saving user to database.",
      error: err,
    });
    next();
  }
});

module.exports = router;
