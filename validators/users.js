const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateAddUser = [
    check('firstName', 'Name is requied').exists().not().isEmpty(),
    check('lastName', 'Name is requied').exists().not().isEmpty(),
    check('email', 'Please include a valid email')
        .exists()
        .not()
        .isEmpty()
        .isEmail(),
    check(
        'password',
        'Password must be 8 or more characters, have a minimum 1 (lower case, Upper case and Number)',
    )
        .exists()
        .not()
        .isEmpty()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: false,
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { validateAddUser };
