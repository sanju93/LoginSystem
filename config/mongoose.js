let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LoginSystem')
.then(() => {
     console.log("database connected");
},
(err) => {
    console.log(err);
})

module.exports = mongoose;