// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const cors = require('cors');

const FriendsPageRoute = require('./routes/FriendsPageRoute'); 
const AddFriendRoute = require('./routes/AddFriendRoute'); 


app.use(cors());
app.use('/friends', FriendsPageRoute); 
app.use('/addFriends', AddFriendRoute); 

// export the express app we created to make it available to other modules
module.exports = app