const TokenService = require('./token.service');

class TokenController {

  constructor() {
    this.tokenService = new TokenService();
  }

  async tokenize(request, reply) {
    try {
      const accountNumbers = request.body;
      const tokens = await this.tokenService.tokenize(accountNumbers);
      const tokenValues = tokens.map(token => token.token);
      return reply.code(200).send(JSON.stringify(tokenValues));
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  async detokenize(request, reply) {
    try {
      const tokens = request.body;
      const accounts = await this.tokenService.detokenize(tokens);
      const accountValues = accounts.map(account => account.accountNumber);
      return reply.code(200).send(JSON.stringify(accountValues));
    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

module.exports = TokenController;
