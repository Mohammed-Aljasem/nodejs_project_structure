const PermissionSchema = require('../schemas/PermissionSchema');
const BaseModel = require('./BaseModel');

class PermissionModel extends BaseModel {
    constructor() {
        super(PermissionSchema);
    }

    async getPermissionsByRole(role){
        return this.modelSchema.find({ role: role}).exec()
    }

}

module.exports = PermissionModel;
