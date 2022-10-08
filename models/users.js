const mongoose = require('mongoose');

const { Schema } = mongoose;

const mySchema = new Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const model = mongoose.model('Users', mySchema);
module.exports = model;

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     googleId: {
//         type: String,
//         required: true,
//     },
//     displayName: {
//         type: String,
//         required: true,
//     },
//     firstName: {
//         type: String,
//         required: true,
//     },
//     lastName: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model('User', UserSchema);
