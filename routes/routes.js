const express = require('express');
const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");
const PermissionController = require("../controllers/PermissionController");
const ProductController = require("../controllers/ProductController");
const checkPermissionMiddleware = require("../middlewares/checkPermissionMiddleware");
const auth = require('../middlewares/authMiddleware');
const upload = require("../helpers/uploadFiles");
const router = express.Router();

router.post('/login/', AuthController.login);
router.post('/register/', AuthController.register);

//user routes
router.get('/users/', auth, checkPermissionMiddleware('user_list'), UserController.index);
router.get('/users/get_name/:id', auth, checkPermissionMiddleware('user_name'), UserController.name);
router.get('/users/get_admin_name/:id', auth, checkPermissionMiddleware('user_name'), UserController.getAdminName);
router.get('/users/:id', auth, checkPermissionMiddleware('user_view'),UserController.view);
router.post('/users/create', auth, checkPermissionMiddleware('user_create'),UserController.create);
router.put('/users/update/:id', auth, checkPermissionMiddleware('user_update'), UserController.update);
router.delete('/users/delete/:id', auth, checkPermissionMiddleware('user_delete'), UserController.delete);

//permission routes
router.get('/permissions/', auth, checkPermissionMiddleware('permission_list'), PermissionController.index);
router.get('/permissions/:id', auth, checkPermissionMiddleware('permission_view'), PermissionController.view);
router.get('/permissions/name/:id', auth, checkPermissionMiddleware('permission_name'), PermissionController.name);
router.post('/permissions/create', auth, checkPermissionMiddleware('permission_create'), PermissionController.create);
router.put('/permissions/update/:id', auth, checkPermissionMiddleware('permission_update'), PermissionController.update);
router.delete('/permissions/delete/:id', auth, checkPermissionMiddleware('permission_delete'), PermissionController.delete);

router.get('/product/', auth, checkPermissionMiddleware('product_list'), ProductController.index);
router.get('/product/:id', auth, checkPermissionMiddleware('product_view'), ProductController.view);
router.get('/product/name/:id', auth, checkPermissionMiddleware('product_name'), ProductController.name);
router.post('/product/create', auth, checkPermissionMiddleware('product_create'), upload.single('image'), ProductController.create);
router.put('/product/update/:id', auth, checkPermissionMiddleware('product_update'), ProductController.update);
router.delete('/product/delete/:id', auth, checkPermissionMiddleware('product_delete'), ProductController.delete);

module.exports = router;
