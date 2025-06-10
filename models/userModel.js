const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
})
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;


