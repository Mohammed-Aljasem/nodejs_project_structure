const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    position: String,
    role: String,
});

module.exports = mongoose.model('User', userSchema);
