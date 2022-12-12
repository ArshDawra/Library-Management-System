const users = require('../models/userModel');

async function getSignUp (req,res) {
    try{
    // send the frontend signup 
    await res.json({
        message : "Sign Up!"
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function getLogIn (req,res) {
    try{
    // send the frontend login
    await res.json({
        message : "Log In!"
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function postSignUp (req,res) {
    try{
    let dataObj = req.body;
    let user = await users.create(dataObj);
    res.json({
        message : "User Signed Up",
        data : user
    });
    }
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function postLogIn (req,res) {
try {
    let userEmail = req.body.userEmail;
    let password = req.body.password;
    let user = await users.findOne({userEmail : userEmail});
    if(user){
        if(password == user.password){
        return res.json({
            message : "User logged In"
        });
    }
    else{
        return res.json({
            message : "Wrong Credentials"
        }) 
    }
    }
    else{
        return res.json({
            message : "User Not Found"
        })
    }
}
catch(err){
    res.json({
        message : err.message
    });
}
}

async function updateUser (req,res){
        // mandatory for user to enter userEmail and Password
        try {
            let userEmail = req.body.userEmail;
            let password = req.body.password;
            let user = await users.findOne({userEmail : userEmail});
            if(user){
                if(password == user.password){
                    let dataToBeUpdated =  req.body;
                    let user = await users.findOneAndUpdate({userEmail : req.body.userEmail},dataToBeUpdated);
                    res.json({
                        message : "Data Updated",
                        data : user
                    });
            }
            else{
                return res.json({
                    message : "Wrong/Incomplete Credentials, it's mandatory to input correct Email and Password"
                }) 
            }
            }
            else{
                return res.json({
                    message : "User Not Found"
                })
            }
        } 
    catch(err){
        res.json({
            message : err.message
        });
    }
}

async function deleteUser (req,res){
    // mandatory for user to enter userEmail and Password
    try {
        let userEmail = req.body.userEmail;
        let password = req.body.password;
        let user = await users.findOne({userEmail : userEmail});
        if(user){
            if(password == user.password){
                let user = await users.findOneAndDelete({userEmail : req.body.userEmail});
                res.json({
                    message : "User's account has been deleted",
                    data : user
                });
        }
        else{
            return res.json({
                message : "Wrong Credentials, can't delete user account"
            }) 
        }
        }
        else{
            return res.json({
                message : "User Not Found"
            })
        }
    } 
    catch(err){
        res.json({
            message : err.message
        });
    }
}

module.exports ={
    getSignUp,
    getLogIn,
    postLogIn,
    postSignUp,
    updateUser,
    deleteUser
}