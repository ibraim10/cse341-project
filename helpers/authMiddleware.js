/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}
function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
}

module.exports = {
    ensureAuth,
    ensureGuest,
};
