const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true,
        unique : true,
        validate : function(){
            return emailValidator.validate(this.userEmail);
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    confirmPassword : {
        type : String,
        required : true,
        minLength : 8,
        validate : function(){
            return this.confirmPassword == this.password;
        }
    },
    admin : {
        type : Boolean,
        required : true
    },
    fine : {
        type : Number,
        default : 0
    },
});

userSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

const users = mongoose.model('users',userSchema);
module.exports = users;
