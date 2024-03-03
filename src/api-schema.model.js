const tokenizeRequestSchema = {
  body: {
    type: 'object',
    properties: {
      accountNumbers: {
        type: 'array',
        items: { type: 'string' }
      }
    },
    required: ['accountNumbers']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        tokens: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};

const detokenizeRequestSchema = {
  body: {
    type: 'object',
    properties: {
      tokens: {
        type: 'array',
        items: { type: 'string' }
      }
    },
    required: ['tokens']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        tokens: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};


module.exports = { tokenizeRequestSchema, detokenizeRequestSchema };
