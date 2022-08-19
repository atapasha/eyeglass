const e = require("express");
const { stringify } = require("nodemon/lib/utils")

const mongoose = require('mongoose')




const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,

    },

    email: {
        type: String,
        unique: true,
        dropDups: true

    },
    phone: {
        type: String,
        dropDups: true,
        required: true

    },

    password: {
        type: String,
    }


})


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel

