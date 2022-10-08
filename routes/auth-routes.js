const express = require('express');
const passport = require('passport');

const router = express.Router();

// Auth Login
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// Auth Callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    },
);
// Logout
router.get('/logout', (req, res, next) => {
    // eslint-disable-next-line consistent-return
    req.logout((error) => {
        if (error) {
            return next(error);
        }
        res.redirect('/');
    });
});

module.exports = router;
// app.get('/', (req, res) => {
//     res.send('<a href="/auth/google">Register with Google</a>');
// });
// app.get(
//     '/auth/google',
//     passport.authenticate('google', { scope: ['email', 'profile'] }),
// );
// app.get(
//     '/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/protected',
//         failureRedirect: '/auth/failure',
//     }),
// );
// app.get('/auth/failure', (req, res) => res.send(`something went wrong`));
// app.get('/protected', isLoggedIn, (req, res) => {
//     res.send(`Welcome ${req.user.displayName}`);
// });
// app.get('/logout', (req, res, next) => {
//     // eslint-disable-next-line func-names, consistent-return
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         // res.redirect('/');
//         res.send('Goodbye');
//     });
//     req.session.destroy();
// });
