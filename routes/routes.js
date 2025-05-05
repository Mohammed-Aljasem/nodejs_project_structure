const express = require('express');
const UserController = require("../controllers/UserController");
const PermissionController = require("../controllers/PermissionController");
const ProductController = require("../controllers/ProductController");
const checkPermissionMiddleware = require("../middlewares/checkPermissionMiddleware");
const upload = require("../helpers/uploadFiles");
const router = express.Router();

//user routes
router.get('/users/', checkPermissionMiddleware('user_list'), UserController.index);
router.get('/users/get_name/:id',checkPermissionMiddleware('user_name'), UserController.name);
router.get('/users/get_admin_name/:id',checkPermissionMiddleware('user_name'), UserController.getAdminName);
router.get('/users/:id', checkPermissionMiddleware('user_view'),UserController.view);
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

router.get('/product/', checkPermissionMiddleware('product_list'), ProductController.index);
router.get('/product/:id', checkPermissionMiddleware('product_view'), ProductController.view);
router.get('/product/name/:id', checkPermissionMiddleware('product_name'), ProductController.name);
router.post('/product/create', checkPermissionMiddleware('product_create'), upload.single('image'), ProductController.create);
router.put('/product/update/:id', checkPermissionMiddleware('product_update'), ProductController.update);
router.delete('/product/delete/:id', checkPermissionMiddleware('product_delete'), ProductController.delete);

module.exports = router;
