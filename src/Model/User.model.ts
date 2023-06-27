const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        min: 6,
        max: 255,
    },
    userId: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    userImage: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    
});

const User = mongoose.model("user", UserSchema);
module.exports = User;