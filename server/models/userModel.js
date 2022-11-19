const mongoose = require('mongoose')
const { USER_COLLECTION} = require('../config/collections')


const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true, "first name is required"]
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        required: [true, "userame is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        max: 50,
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isReported: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)


const UserModel = mongoose.model(USER_COLLECTION, UserSchema)

module.exports = UserModel;