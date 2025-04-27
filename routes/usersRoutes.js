const express = require('express');
const UserController = require("../controllers/UserController");
const router = express.Router();
router.get('/', UserController.index);
router.get('/:id', UserController.view);
router.post('/create', UserController.create);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);
module.exports = router;
