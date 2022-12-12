const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName : {
        type : String,
        required : true
    },
    authorName : {
        type : String,
        required : true
    },
    publisher : {
        type : String,
        required : true
    },
    bookStatus : {
        type : Boolean,
        required : true,
        default : true
    },
    bookID : {
        type : Number,
        required : true,
        unique : true
    },
    userID : {
        type : String
    }, 
    issueDate : {
        type : Date
    },
    returnDate : {
        type : Date
    },
    log : [{
        type : String}]
});

const books = mongoose.model('books',bookSchema);
module.exports = books;