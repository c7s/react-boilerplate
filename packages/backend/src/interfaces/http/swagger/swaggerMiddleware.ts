const SwaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

export default [SwaggerUi.serve, SwaggerUi.setup(swaggerDocument)];
