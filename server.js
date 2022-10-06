const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dbConnection = require('./db/connection');
const router = require('./routes');
require('./auth/auth');

function isLoggedIn(req, res, next) {
    // eslint-disable-next-line no-unused-expressions
    req.user ? next() : res.sendStatus(401);
}

dbConnection();
const app = express();
const port = process.env.PORT || 3000;

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

const options = {
    swaggerOptions: {
        validatorUrl: null,
    },
};

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// TODO Cookies
// app.use(
//     cookieSession({
//         name: 'session',
//         keys: ['key1', 'key2'],
//     }),
// );

//! Passport
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Register with Google</a>');
});
app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }),
);
app.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    }),
);
app.get('/auth/failure', (req, res) => res.send(`something went wrong`));
app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.displayName}`);
});
app.get('/logout', (req, res, next) => {
    // eslint-disable-next-line func-names, consistent-return
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // res.redirect('/');
        res.send('Goodbye');
    });
    req.session.destroy();
});
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/failed', (req, res) => res.send('You failed to log in'));
// app.get('/good', (req, res) => res.send(`Welcome ${req.user.email}`));

// app.get(
//     '/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] }),
// );

// app.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect: '/failed' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/good');
//     },
// );

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});
