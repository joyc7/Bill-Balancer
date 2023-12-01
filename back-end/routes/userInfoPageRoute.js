const express = require("express");
const router = express.Router();

const userInfoData = {
    id: 1,
    name: 'Bryn',
    email: 'btaylot0@booking.com',
    avatar: 'https://robohash.org/utetquibusdam.png?size=50x50&set=set1',
    user: [
        {
            id: 2,
            name: 'Jdavie',
            email: 'jzecchinii0@yahoo.co.jp',
        },
        {
            id: 3,
            name: 'Emmie',
            email: 'esworder1@xinhuanet.com',
        },
    ],
};

// Endpoint to fetch user information and send it as a JSON response
router.get("/", async (req, res) => {
    res.json(userInfoData);
  });

module.exports = router;
