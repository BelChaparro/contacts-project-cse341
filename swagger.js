const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'My API',
      description: 'Description'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// To install swagger.json
swaggerAutogen(outputFile, routes, doc);