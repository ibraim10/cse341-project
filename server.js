const express = require('express');
const bodyParser = require('body-parser');
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

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});
