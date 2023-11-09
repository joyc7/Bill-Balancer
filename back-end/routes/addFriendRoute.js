const express = require('express');
const router = express.Router();

// Hardcoded user data to simulate a database
let userData = {
        "name": "Sallyanne",
        "email": "sgoseling0@eepurl.com",
        "phone": "764-995-4333",
        "avatar": "https://robohash.org/eligendiquiased.png?size=50x50&set=set1",
      }

// Endpoint to get user data with friends
router.get('/', (req, res) => {
  res.json(userData);
});

module.exports = router;
