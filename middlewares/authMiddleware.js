const jwt = require('jsonwebtoken');
const BlockedTokensModel = require("../models/BlockedTokensModel");
require('dotenv').config();

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: 'No token provided'});
    const blockedTokenModel = new BlockedTokensModel()
    const token = authHeader.split(' ')[1];
    const tokensWasBlocked = await blockedTokenModel.whereMore({token})
    if(tokensWasBlocked.length){
       res.status(403).json({message: 'This token are blocked'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({message: 'Invalid token'});
    }
};
