const express = require('express');
const UserController = require("../controllers/UserController");
const PermissionController = require("../controllers/PermissionController");
const checkPermissionMiddleware = require("../middlewares/checkPermissionMiddleware");
const router = express.Router();

//user routes
router.get('/users/', checkPermissionMiddleware('user_list'), UserController.index);
router.get('/users/:id', checkPermissionMiddleware('user_view'),UserController.view);
router.get('/users/name/:id',checkPermissionMiddleware('user_name'), UserController.name);
router.post('/users/create', checkPermissionMiddleware('user_create'),UserController.create);
router.put('/users/update/:id', checkPermissionMiddleware('user_update'), UserController.update);
router.delete('/users/delete/:id', checkPermissionMiddleware('user_delete'), UserController.delete);

//permission routes
router.get('/permissions/', checkPermissionMiddleware('permission_list'), PermissionController.index);
router.get('/permissions/:id', checkPermissionMiddleware('permission_view'), PermissionController.view);
router.get('/permissions/name/:id', checkPermissionMiddleware('permission_name'), PermissionController.name);
router.post('/permissions/create', checkPermissionMiddleware('permission_create'), PermissionController.create);
router.put('/permissions/update/:id', checkPermissionMiddleware('permission_update'), PermissionController.update);
router.delete('/permissions/delete/:id', checkPermissionMiddleware('permission_delete'), PermissionController.delete);

module.exports = router;
