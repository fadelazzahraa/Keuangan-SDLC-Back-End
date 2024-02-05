const swaggerAutogen = require('swagger-autogen')();

const options = {
  info: {
    title: 'My API',
    description: "Created by Fadel Azzahra, for Keamanan Pemrograman Lanjutan's project"
  },
  host: 'localhost:8080',
};

const outputFile = './swagger-output.json';
const routes = ['../server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, options);