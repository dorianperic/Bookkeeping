const mongoose = require('mongoose');

//book model definition
var schema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    author:{
        type : String,
        required : true,
    },
    availability:{
        type : Boolean,
        required : true
    },
    borrower:{
        type : String,
        required : false,
    },
    description:{
        type : String,
        required : true,
    },
    type:{
        type : String,
        required : true,
    },
    bookpicture:{
        type : String,
        required : true
    },
    authorpicture:{
        type : String,
        required : true
    }
})

//user model definition
var schema2 = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    passwordhash:{
        type : String,
        required : true,
    },
    role:{
        type : Boolean,
        required : true
    }
})

const Bookdb = mongoose.model('bookdb', schema)
const Userdb = mongoose.model('userdb', schema2)

module.exports = {Bookdb, Userdb};