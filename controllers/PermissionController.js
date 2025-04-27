const Permission = require('../models/PermissionModel');

class PermissionController {
    static async index(req, res) {
        const permissionModel = new Permission()
        const permissions = await permissionModel.getAll()
        return res.status(200).json(permissions);
    }

    static async view(req, res) {
        try {
            const permissionModel = new Permission();
            const permission = await permissionModel.findOne(req.params.id) // <-- find by ID
            if (!permission) return res.status(404).json({ error: 'Permission not found' });
            res.json(permission);
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async name(req, res) {
        try {
            const permissionModel = new Permission();
            const name = await permissionModel.getName(req.params.id)
            res.json({name});
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async create(req, res) {
        const permissionModel = new Permission()
        await permissionModel.create(req.body)
        return res.status(201).json({message: 'Permission created', permission: req.body});
    }

    static async update(req, res) {
        const permissionModel = new Permission()
        const permission = await permissionModel.update(req.params.id, req.body)
        return res.status(200).json(permission);
    }

    static async delete(req, res) {
        try {
            const permissionModel = new Permission()
            const deletedPermission = await permissionModel.delete(req.params.id);

            if (!deletedPermission) {
                return res.status(404).json({ error: 'Permission not found' });
            }
            res.json({ message: 'Permission deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete permission' });
        }
    }
}


module.exports = PermissionController;
