const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// const { mongoose } = require('mongoose');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dbConnection = require('./db/connection');
const router = require('./routes');

// passport Auth
require('./auth/auth')(passport);

dbConnection();
const app = express();
const port = process.env.PORT || 3000;

// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// set up view engine
app.engine('.hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Session
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    }),
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// app.get('/', (req, res) => {
//     res.render('home');
// });

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});
