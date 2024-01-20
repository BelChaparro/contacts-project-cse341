const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Contacts API',
      description: 'Contacts API'
    },
    host: 'project1-93cj.onrender.com',
    scheme: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// To install swagger.json
swaggerAutogen(outputFile, routes, doc);