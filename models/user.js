let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type  : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
},{timestamps : true});

let User = mongoose.model('User',userSchema);

module.exports = User;