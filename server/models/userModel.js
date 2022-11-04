const mongoose = require('mongoose')


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
    followers: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    isReported: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: null,
    }
},
    { timestamps: true }
)


const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;