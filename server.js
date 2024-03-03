const fastify = require('fastify')();

const tokenController = require('./src/token.controller');
const { tokenizeRequestSchema, detokenizeRequestSchema} = require('./src/api-schema.model')

fastify.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Tokenization API',
      description: 'API for tokenization and detokenization',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Tokenization', description: 'Endpoints for tokenization' },
      { name: 'Detokenization', description: 'Endpoints for detokenization' },
    ]
  }
});

fastify.post('/tokenize', {
  schema: {
    ...tokenizeRequestSchema,
    tags: ['Tokenization'] 
  }
}, tokenController.tokenize);

fastify.post('/detokenize', {
  schema: {
    ...detokenizeRequestSchema,
    tags: ['Detokenization'] 
  }
}, tokenController.detokenize);

const options = {
  port: 3000
};

// Start the server
const start = async () => {
  try {
    await fastify.listen(options);
    console.log('Server listening on', fastify.server.address().port);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
