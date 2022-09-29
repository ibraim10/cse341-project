const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./db/connection');
const router = require('./routes');

dbConnection();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
    console.log(`APP listening on port ${port}`);
});
