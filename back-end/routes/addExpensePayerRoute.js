const express = require("express");
const router = express.Router();

// Hardcoded user data to simulate a database
let groupMemberData = [
  {
    id: "6563ef872efb0831eb469685",
    first_name: "Maressa",
    avatar: "https://robohash.org/quiaperiamrem.png?size=50x50&set=set1",
  },
  {
    id: "c5aec175dec7aa9b12fbbcec",
    first_name: "Fredric",
    avatar: "https://robohash.org/quaeetcorrupti.png?size=50x50&set=set1",
  },
  {
    id: "da010c6adaba8d43dcc3d1b0",
    first_name: "Rosina",
    avatar:
      "https://robohash.org/officiismaximecorrupti.png?size=50x50&set=set1",
  },
  {
    id: "de11fa38fc27afb4fc9affdf",
    first_name: "Sim",
    avatar: "https://robohash.org/animidoloribusomnis.png?size=50x50&set=set1",
  },
  {
    id: "35bcf43dabccaeca4ee8ea4c",
    first_name: "Olenka",
    avatar: "https://robohash.org/rerumsaepeculpa.png?size=50x50&set=set1",
  },
];

// Endpoint to get user data after search
router.get("/", (req, res) => {
  res.json(groupMemberData);
});

module.exports = router;
