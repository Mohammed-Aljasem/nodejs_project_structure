const BlockedTokens = require('../schemas/BlockedTokensSchema');
const BaseModel = require("./BaseModel");

class BlockedTokensModel extends BaseModel {
    constructor() {
        super(BlockedTokens);
    }
}

module.exports = BlockedTokensModel;
