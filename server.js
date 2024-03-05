const TokenApp = require('./src/token.app');

const config = {
  port: 3000 
};
  
const tokenApp = new TokenApp(config);
tokenApp.start();