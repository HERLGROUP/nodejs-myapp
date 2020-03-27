const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var registerSchema = new mongoose.Schema({
    fullName: { type: String, required: 'Please Enter your name'},
    cars: String,
    birthday: String,
    email: String,
    gender: String,
    role: { type: String, required: 'Please Select a role'}
});

registerSchema.plugin(passportLocalMongoose, {usernameField: 'email'});
module.exports = mongoose.model("User", registerSchema);