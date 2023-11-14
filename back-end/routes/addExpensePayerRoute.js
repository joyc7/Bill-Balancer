const express = require('express');
const router = express.Router();

// Hardcoded user data to simulate a database
let groupMemberData = [{
    "id": 1,
    "first_name": "Maressa",
    "avatar": "https://robohash.org/quiaperiamrem.png?size=50x50&set=set1"
  }, {
    "id": 2,
    "first_name": "Fredric",
    "avatar": "https://robohash.org/quaeetcorrupti.png?size=50x50&set=set1"
  }, {
    "id": 3,
    "first_name": "Rosina",
    "avatar": "https://robohash.org/officiismaximecorrupti.png?size=50x50&set=set1"
  }, {
    "id": 4,
    "first_name": "Sim",
    "avatar": "https://robohash.org/animidoloribusomnis.png?size=50x50&set=set1"
  }, {
    "id": 5,
    "first_name": "Olenka",
    "avatar": "https://robohash.org/rerumsaepeculpa.png?size=50x50&set=set1"
  }]

// Endpoint to get user data after search
router.get('/', (req, res) => {
  res.json(groupMemberData);
});

module.exports = router;
