// const express = require('express');

const router = require('express-promise-router')();
// Validate info
const { validateAddAndUpdate } = require('../validators/users');
// Controller
const usersController = require('../controller/users');

// CRUD
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUser);
router.post('/', validateAddAndUpdate, usersController.addUser);
router.put('/:id', validateAddAndUpdate, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
