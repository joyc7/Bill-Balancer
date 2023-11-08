const express = require('express');
const router = express.Router();

// Hardcoded user data to simulate a database
let userData = {
    "id": 2,
    "name": "Jackie",
    "email": "jlennarde1@chron.com",
    "phone": "294-405-3213",
    "avatar": "https://robohash.org/adquiearum.png?size=50x50&set=set1",
    "friends": [
      {
        "id": 1,
        "name": "Gram",
        "email": "gsimkovich0@tinypic.com",
        "phone": "774-942-2329",
        "balance": "$23.09"
      },
      {
        "id": 3,
        "name": "Guglielma",
        "email": "gstollman1@pcworld.com",
        "phone": "766-333-8864",
        "balance": "$38.08"
      },
      {
        "id": 4,
        "name": "Rayshell",
        "email": "rstoltz2@telegraph.co.uk",
        "phone": "417-701-1983",
        "balance": "$-84.14"
      }, 
      {
        "id": 5,
        "name": "Abram",
        "email": "ahagstone0@deviantart.com",
        "phone": "731-534-8801",
        "balance": "$5.77"
      },
      {
        "id": 6,
        "name": "Tommi",
        "email": "tpoles1@nyu.edu",
        "phone": "420-457-5256",
        "balance": "$85.56"
      },
      {
        "id": 7,
        "name": "Nicolai",
        "email": "nprinnett1@reuters.com",
        "phone": "223-681-0748",
        "balance": "$-71.17"
      }
    ]
  }

// Endpoint to get user data with friends
router.get('/', (req, res) => {
  res.json(userData);
});

module.exports = router;
