const mongoose = require('mongoose');

const BlockedTokensSchema = new mongoose.Schema({
    token: String,
});

module.exports = mongoose.model('BlockedTokens', BlockedTokensSchema);
