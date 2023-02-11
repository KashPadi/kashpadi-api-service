import config from '../../config/config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'KashPadi',
    version: '0.0.1',
    description: 'KashPadi API Documentation',
    license: {
      name: 'MIT',
      url: '',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Development Server',
    },
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Test Server',
    },
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'Production Server',
    },
  ],
};

export default swaggerDefinition;
