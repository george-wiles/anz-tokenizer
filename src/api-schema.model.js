const tokenizeRequestSchema = {
  body: {
    type: 'array',
    items: { type: 'string' }
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

const detokenizeRequestSchema =  {
  body: {
    type: 'array',
    items: { type: 'string' }
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
