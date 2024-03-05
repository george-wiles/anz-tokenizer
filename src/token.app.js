const TokenController = require('./token.controller');
const { tokenizeRequestSchema, detokenizeRequestSchema } = require('./api-schema.model')

class TokenApp {
    constructor(config) {
        this.fastify = require('fastify')();
        this.tokenController = new TokenController();
        this.init()
        this.setupRoutes();

        this.options = {
            port: config.port || 3000
        };
    }

    setupRoutes() {
        this.fastify.post('/tokenize', {
            schema: {
                ...tokenizeRequestSchema,
                tags: ['Tokenization']
            }
        }, async (request, reply) => {
            try {
                const accountNumbers = await this.tokenController.tokenize(request, reply);
                reply.code(200).send({ accountNumbers });
            } catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        });

        this.fastify.post('/detokenize', {
            schema: {
                ...detokenizeRequestSchema,
                tags: ['Detokenization']
            }
        }, async (request, reply) => {
            try {
                const accountNumbers = await this.tokenController.detokenize(request, reply);
                reply.code(200).send({ accountNumbers });
            } catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Internal Server Error' });
            }
        });
    }

    init() {
        this.fastify.register(require('@fastify/swagger'), {
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
    }

    async start() {
        try {
            await this.fastify.listen(this.options);
            console.log('Server listening on', this.fastify.server.address().port);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}

module.exports = TokenApp;