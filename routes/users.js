const express = require('express');

const router = express.Router();

// Controller
const usersController = require('../controller/users');

// CRUD
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.addUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
