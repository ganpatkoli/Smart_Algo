

"use strict"

const { Schema, model } = require('mongoose');

// Employee Financial Information Collection
const userModel = Schema({
    FullName: {
        type: String,
        required: true,
        trim: true
    },
    UsserName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    PhoneNo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        trim: true
    },
    Otp: {
        type: String,
        required: true,
        trim: true
    },
    CreateDate: {
        type: Date,
        default: Date.now
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    LoginStatus: {
        type: String,
        enum: ['0', '1'],
        default: '0'
    }
},
    {
        timestamps: true
    },

)
const User_model = model('USER_MODEL', userModel);



module.exports = { User_model: User_model };
