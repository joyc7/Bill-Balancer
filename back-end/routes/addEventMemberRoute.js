const express = require('express');
const router = express.Router();
const User = require("../models/User.js")
const Event = require("../models/Event.js");
const {body, validationResult} = require("express-validator")

// Hardcoded user data to simulate a database
/*
let friendData = [{
    "id":"507f1f77bcf86cd799439011",
    "name":"Gaby Coupar",
    "avatar":"https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1",
    "phone":"435-715-2899",
    "email":"gcoupar0@rakuten.co.jp"
  }, {
    "id": "507f1f77bcf86cd799439012",
    "name": "Andy Gaber",
    "avatar": "https://robohash.org/quaeetcorrupti.png?size=50x50&set=set1",
    "phone":"425-712-2309",
    "email":"gmember0@rakuten.co.jp"
  }]
  
// Endpoint to get user data after search
router.get('/', (req, res) => {
    res.json(friendData);
});
*/

router.get('/friends/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      // Find the user and populate the friends list
      const user = await User.findById(userId).populate('friends');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.friends);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

router.post('/events/:eventId/participants', async (req, res) => {
  try {
      const { eventId } = req.params;
      const { memberId } = req.body; // Assume memberId is sent in the request body

      // Find the event and add the new member
      const event = await Event.findById(eventId);

      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Check if member is already in the participants list
      if (event.participants.includes(memberId)) {
          return res.status(400).json({ message: 'Member already in the event' });
      }

      // Add the member to the participants list
      event.participants.push(memberId);
      await event.save();

      res.json(event);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
