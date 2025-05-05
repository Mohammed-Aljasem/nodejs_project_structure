const PermissionModel = require('../models/PermissionModel');
const RoleEnum = require('../enums/RoleEnum');

const checkPermissionMiddleware = (route_name) => async (req, res, next) => {
    const role = req.headers['role']; // admin , power_admin
    if(role === RoleEnum.SUPER_ADMIN){
        return next()
    }

    const permissionModel = new PermissionModel()
    const rolePermissions = await permissionModel.getPermissionsByRole(role);
    const hasPermission = rolePermissions.filter((permission)=> {
        return permission.key == route_name;
    })
    req.role = role;
    if(hasPermission.length){
       return next();
    }
    return res.status(403).json({message: "you are not allowed to access this url"})
};


module.exports = checkPermissionMiddleware
