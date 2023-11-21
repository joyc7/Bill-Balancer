const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const response = {
    status: "Success",
    message: "We recieved your data!",
    data: {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
  };
  res.json(response);
});

module.exports = router;
