const tokenService = require('./token.service');

class TokenController {
  static async tokenize(req, reply) {
    try {
      const accountNumbers = req.body.accountNumbers;
      const tokens = await tokenService.tokenize(accountNumbers);
      const jsonResponse = JSON.stringify({ tokens });
      return reply.code(200).send(jsonResponse);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  static async detokenize(req, reply) {
    try {
      const tokens = req.body.tokens;
      const accountNumbers = await tokenService.detokenize(tokens);
      const jsonResponse = JSON.stringify({ accountNumbers });
      return reply.code(200).send(jsonResponse);
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = TokenController;
