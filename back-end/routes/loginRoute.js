const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const response = {
    status: "Success",
    message: "We recieved your data!",
    data: {
      name: req.body.username,
      password: req.body.password,
    },
  };
  res.json(response);
});

module.exports = router;
