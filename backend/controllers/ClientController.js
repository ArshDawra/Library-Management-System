const users = require('../models/userModel');
const books = require('../models/bookModel');

async function getClient (req,res) {
    try{
    // display client dashboard which has user's profile view and to search books
    // this page appears after client logs in 
    res.json({
        message : "Client's Dashboard"
    });
    }
    catch(err){
        res.json({
            message : err
        });
    }
}

async function searchBook (req,res){
    try{
       bookName = req.body.bookName;
       let bookList = await books.find({bookName : bookName});
       res.json({
        message : "Results based on user's search",
        list : bookList
       })
    }
    catch(err){
        res.json({
            message : err.message
        });
    } 
}

async function issueBook (req,res){
    try{
    // request body will contain the book ID and userEmail
      let bookID = req.body.bookID;
      let book = await books.findOne({bookID : bookID});
      let bookStatus = book.bookStatus;
      if(bookStatus){
      const issueDate = new Date();
      const returnDate = new Date();
      let userID = req.body.userEmail;
      returnDate.setDate(returnDate.getDate() + 15);
      let dataToBeUpdated = {
        bookStatus : false,
        userID : userID,
        issueDate : issueDate,
        returnDate : returnDate
      }
    let updatedBook = await books.findOneAndUpdate({bookID : bookID},dataToBeUpdated);
    res.json({
        message : "Book Issued!",
        data : updatedBook
    }); 
    }
    else{
        res.json({
            message : "Book Not Available"
        })
    }
}
    catch(err){
        res.json({
            message : err.message
        });
    } 
}

// fix renew
async function renewBook (req,res){
    try{
    // request body will contain the book ID 
    // take userID from previous data
    // can be renewed only on/after return date
      const bookID = req.body.bookID;
      const issueDate = new Date();
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 15);
      let userID = await books.findOne({bookID : bookID}).userID;
      let dataToBeUpdated = {
        bookStatus : false,
        userID : userID,
        issueDate : issueDate,
        returnDate : returnDate
      }
    let updatedBook = await books.findOneAndUpdate({bookID : bookID},dataToBeUpdated);
    res.json({
        message : "Book Renewed!",
        data : updatedBook
    }); 
    }
    catch(err){
        res.json({
            message : err.message
        });
    } 
}

async function returnBook (req,res){
    try{
    // request body will contain the book ID
    let bookID = req.body.bookID;
    let book = await books.findOne({bookID : bookID});
    let bookStatus = book.bookStatus;
      if(bookStatus==false){
      let previousUserID = book.userID;
      let Log = book.log;
      Log.push(previousUserID);
      let dataToBeUpdated = {
        bookStatus : true,
        userID : null,
        issueDate : null,
        returnDate : null,
        log : Log
      }
      let user = await users.findOne({userEmail : previousUserID});
      let oldFine = user.fine ;
      let newFine = oldFine + fineCalculation(book);
      let fineUpdated = {
        fine : newFine
      }
    let updatedBook = await books.findOneAndUpdate({bookID : bookID},dataToBeUpdated);
    let updatedUser = await users.findOneAndUpdate({userEmail : previousUserID},fineUpdated);
    res.json({
        message : "Book Returned!",
        bookData : updatedBook,
        userData : updatedUser
    }); 
    }
    else{
        res.json({
            message : "you're returning a book you never issued?"
        })
        }
}
    catch(err){
        res.json({
            message : err.message
        });
    } 
}

function fineCalculation (book){
    let returnDate = book.returnDate;
    let currentDate = new Date();
    let currentDateTime = currentDate.getTime();
    let returnDateTime = returnDate.getTime();
    let fine = 0;
    if(currentDateTime > returnDateTime){
    let Difference_In_Time = currentDateTime - returnDateTime;
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // Fine set as 2 rupees per day after return date
    fine = Difference_In_Days * 2;
    }
    else {
        fine = 0;
    }
    return fine;
}

async function clearFine(req,res){
    try {
        let userEmail = req.body.userEmail;
        let user = await users.findOne({userEmail : userEmail});
        let totalFineCleared = user.fine;
        let dataToBeUpdated = {
            fine : 0
        }  
    let updatedUser = await users.findOneAndUpdate ({userEmail : userEmail},dataToBeUpdated); 
    res.json({
        message : `Fine Cleared by Client : ${totalFineCleared} Rupees`,
        data : updatedUser
    });      
    }
    catch(err){
        res.json({
            message : err.message
        });
    } 
}

let flag = true; // client logged in or not
function protectClientRoute(req,res,next){
    if(flag){
        next();
    }
    else{
        return res.json({
            message : "Operation accessible to only Clients"
        })
    }
}

module.exports = {
    getClient,
    searchBook,
    issueBook,
    renewBook,
    returnBook,
    clearFine,
    protectClientRoute
}


