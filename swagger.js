// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users API',
        description: 'Is an API of Users',
    },
    host: 'cse341-project-b0xp.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

// o build the documentation before the project starts and
// immediately start it
// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     // eslint-disable-next-line import/extensions, global-require
//     require('./server.js'); // Your project's root file
// });
