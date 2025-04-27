const User = require('../schemas/UserSchema');
const BaseModel = require("./BaseModel");

class UserModel extends BaseModel {
    constructor() {
        super(User);
    }
}

module.exports = UserModel;
