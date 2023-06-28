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
    department: {
        type: String,
        required: false,
        min: 6,
        max: 255,
    },
    semester: {
        type: String,
        required: false,
        min: 6,
        max: 255,
    },
    onBoardingCompleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    subjects:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]

});

const User = mongoose.model("user", UserSchema);
module.exports = User;