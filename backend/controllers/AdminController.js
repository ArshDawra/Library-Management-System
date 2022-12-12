const users = require('../models/userModel');
const books = require('../models/bookModel');

async function getAdmin (req,res) {
    try{
    // display admin dashboard which has admin's profile view and admin can add, delete or modify books using this dashboard
    // this page appears after admin logs in 
    res.json({
        message : "Admin's Dashboard"
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function addBook (req,res) {
    try{
    let dataObj = req.body;
    let book = await books.create(dataObj);
    res.json({
        message : "New Book Added Successfully",
        data : book
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function modifyBook (req,res){
    try{
    let bookID = req.body.bookID;
    let dataToBeUpdated =  req.body;
    console.log(bookID);
    let book = await books.findOneAndUpdate({bookID : bookID},dataToBeUpdated);
    res.json({
        message : "Book Data Updated",
        data : book
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function deleteBook(req,res){
    try{
    let bookID = req.body.bookID;
    let book = await books.findOneAndDelete({bookID : bookID});
    res.json({
        message : "Book Data Deleted",
        data : book
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

let flag = true; // admin logged in or not
function protectAdminRoute(req,res,next){
    if(flag){
        next();
    }
    else{
        return res.json({
            message : "Operation Not Allowed"
        })
    }
}

async function getBookList (req,res){
    try{
    let bookList = await books.distinct("bookName");
    res.json({
        message : "Unique Book List",
        data : bookList
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

module.exports = {
    getAdmin,
    addBook,
    modifyBook,
    deleteBook,
    protectAdminRoute,
    getBookList
}