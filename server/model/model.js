const mongoose = require('mongoose');

//model definition
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

const Bookdb = mongoose.model('bookdb', schema)

module.exports = Bookdb;