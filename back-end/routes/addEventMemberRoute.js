const express = require("express");
const router = express.Router();
const { User } = require("../models/User.js");
const { Event } = require("../models/Event.js");
const { body, validationResult } = require("express-validator");

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
router.get('/friend', (req, res) => {
    res.json(friendData);
});
*/

router.get("/friendsList/:userId", async (req, res) => {
  try {
    //fetch all data
    const userId = req.params.userId;
    console.log("userId:", userId);
    const userWithFriends = await User.findById(userId).populate({
      path: "friends",
      model: "User",
    });
    console.log(userWithFriends);
    if (!userWithFriends) {
      return res.status(404).send("User not found");
    }
    res.json(userWithFriends);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

/*
router.get('/friends/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching user with ID:', userId);

    const user = await User.findById(userId).populate('friends');
    console.log('User:', user);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.friends);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.post('/events/:eventId/participants', async (req, res) => {
  try {
      const { eventId } = req.params;
      const { memberId } = req.body;

      // Find the event and add the new member
      const event = await Event.findById(eventId);
      const user = await User.findById(userId)

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      if(!user){
        return res.status(404).json({ message: 'User not found'})
      }

      // Check if member is already in the participants list
      if (event.participants.includes(memberId)) {
          return res.status(400).json({ message: 'Member already in the event' });
      }

      // Validate if the memberId is in the user's friend list
      const isFriend = user.friends.some(friend => friend._id.toString() === memberId);

      if (!isFriend) {
          return res.status(400).json({ message: 'Member is not in the user\'s friend list' });
      }

      // Add the member to the participants list
      event.participants.push(memberId);
      await event.save();

      res.json({message: 'Member added successfully', event});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});
*/

module.exports = router;
