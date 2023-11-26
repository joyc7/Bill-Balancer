const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");
const { body, validationResult } = require("express-validator");

// router.post("/", async (req, res) => {
//   const response = {
//     status: "Success",
//     message: "We recieved your data!",
//     data: {
//       name: req.body.username,
//       password: req.body.password,
//     },
//   };
//   res.json(response);
// });

router.post("/", async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res
      .status(401)
      .json({ success: false, message: `No username or password supplied.` });
    next();
  }

  try {
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
      console.error(`User not found.`);
      res.status(401).json({
        success: false,
        message: "User not found in database.",
      });
      next();
    } else if (!user.validPassword(password)) {
      console.error(`Incorrect password.`);
      res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
      next();
    }
    console.log("User logged in successfully.");
    // const token = user.generateJWT();
    // res.json({
    //   success: true,
    //   message: "User logged in successfully.",
    //   token: token,
    //   username: user.username,
    // });

    if (user && user.generateJWT) {
      const token = user.generateJWT();
      res.json({
        success: true,
        message: "User logged in successfully.",
        token: token,
        username: user.username,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User not found or unable to generate token.",
      });
    }

    next();
  } catch (err) {
    console.error(`Error looking up user: ${err}`);
    res.status(500).json({
      success: false,
      message: "Error looking up user in database.",
      error: err,
    });
    next();
  }
});

module.exports = router;
