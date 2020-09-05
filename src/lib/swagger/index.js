const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Summer Event REST API', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'api returning connection between any train stations in Switzerland.', // short description of the app
  },
  host: 'localhost:8080', // the host or url of the app
  basePath: '/', // the basepath of endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./src/docs/**/*.yaml'],
};
// initialize swagger-jsdoc
module.exports = swaggerJSDoc(options);
