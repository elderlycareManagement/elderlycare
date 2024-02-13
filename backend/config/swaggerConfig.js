const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Elderlycard Management',
    version: '1.0.0',
  },
  servers:[{
    url:'http://localhost:4000',
    description:'server API Elderlycare Management'
  }]
};
const options = {
  swaggerDefinition,
  apis: ['./routes/employeeRoutes.js'],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = {swaggerUi,swaggerSpec}