

"use strict"

const { Schema, model } = require('mongoose');

// Employee Financial Information Collection
const userModel = Schema({
    FullName: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        trim: true
    },
    PhoneNo: {
        type: String,
        required: true,
        trim: true
    },

},
    {
        timestamps: true
    },

)
const User_model = model('USER_MODEL', userModel);



module.exports = { User_model:User_model };
