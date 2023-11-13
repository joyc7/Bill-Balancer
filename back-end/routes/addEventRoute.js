const express = require('express');
const router = express.Router();
const axios = require('axios');

// Hardcoded user data to simulate a database
let friendData = {
    "id":1,
    "name":"Gaby Coupar",
    "avatar":"https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1",
    "phone":"435-715-2899",
    "email":"gcoupar0@rakuten.co.jp"
}

// Endpoint to get user data after search
router.get('/', (req, res) => {
    res.json(friendData);
});

module.exports = router;
