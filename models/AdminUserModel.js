const User = require('../schemas/UserSchema');
const BaseModel = require("./BaseModel");

class AdminUserModel extends BaseModel {
    constructor() {
        super(User);
    }

    async getName(id) {
        const name = await super.getName(id)
        return "Mr Admin: " + name;
    }
}

module.exports = AdminUserModel;
