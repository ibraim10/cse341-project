const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
// const mongoose = require('mongoose');
// const { mongoose } = require('mongoose');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const swaggerDocument = require('./swagger.json');
const dbConnection = require('./db/connection');
const router = require('./routes');

dotenv.config();

// passport Auth
require('./auth/auth')(passport);

dbConnection();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MethodOverride
app.use(
    // eslint-disable-next-line consistent-return, no-unused-vars
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            // eslint-disable-next-line no-underscore-dangle, prefer-const
            let method = req.body._method;
            // eslint-disable-next-line no-underscore-dangle
            delete req.body._method;
            return method;
        }
    }),
);

// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Handlebars from helpers
const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
} = require('./helpers/hbs');
// set up view engine
app.engine(
    '.hbs',
    engine({
        helpers: { formatDate, stripTags, truncate, editIcon, select },
        defaultLayout: 'main',
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');

// Session
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.uri }),
    }),
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// Swagger docs
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

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// app.get('/', (req, res) => {
//     res.render('home');
// });

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});
