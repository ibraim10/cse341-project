/* eslint-disable no-unused-vars */
const Model = require('../db/model');

const getAllUsers = async (req, res) => {
    const users = await Model.find();
    res.setHeader('Content-Type', 'application/json');
    // throw new Error('error infinity');
    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await Model.findById(id);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
};
const addUser = async (req, res) => {
    const createUser = new Model(req.body);
    const newUser = await createUser.save();
    res.status(201).json({ id: newUser.id });
};
const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    await Model.findByIdAndUpdate(id, user);
    // throw new Error('error infinity');
    res.status(204).json({ success: true });
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    await Model.findByIdAndRemove(id);
    res.status(200).json({ success: true });
};

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};
