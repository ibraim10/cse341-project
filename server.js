const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dbConnection = require('./db/connection');
const router = require('./routes');

dbConnection();
const app = express();
const port = process.env.PORT || 3000;

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

app.use(passport.initialize());
app.use(passport.session());

app.get('/failed', (req, res) => res.send('You failed to log in'));
app.get('/good', (req, res) => res.send(`Welcome ${req.user.email}`));

app.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    },
);

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});
