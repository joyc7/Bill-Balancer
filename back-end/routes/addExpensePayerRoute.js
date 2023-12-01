const express = require("express");
const router = express.Router();
const {User} = require("../models/User.js")
const Event = require("../models/Event.js");

/*
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
*/

router.get('/EventMember/:eventId', async (req, res) => {
  try {
    //fetch all data
    const eventId = req.params.eventId;
    console.log('eventId:', eventId);
    const eventMember = await Event.findById(eventId).populate('participants');
    if (!eventMember) {
      return res.status(404).json({ message: "Event not found or you don't have access to it" });
    }
    res.json(eventMember.participants);
  }catch (error) {
    console.error("Error fetching event members:", error);
        res.status(500).json({ message: "Server error", error});
  }
});

module.exports = router;
