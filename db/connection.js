const db = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { uri } = process.env;

const dbConnection = async () => {
    await db.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'users_db',
    });
    console.log('Users DB connected');
};

module.exports = dbConnection;
