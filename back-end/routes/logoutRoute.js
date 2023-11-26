const express = require("express");
const router = express.Router();

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

router.get("/logout", function (req, res, next) {
  // nothing really to do here... logging out with JWT authentication is handled entirely by the front-end by deleting the token from the browser's memory
  res.json({
    success: true,
    message:
      "There is actually nothing to do on the server side... you simply need to delete your token from the browser's local storage!",
  });
  next();
});

module.exports = router;
