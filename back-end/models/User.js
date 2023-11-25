const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // email is optional so required is not set to true
  email: {
    type: String,
  },
  // image of user, stored as url or file path
  avatar: String,
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  //   events: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Event",
  //     },
  //   ],
  // waiting for events schema
  events: [
    {
      type: String,
      required: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
