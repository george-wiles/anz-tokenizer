const Loki = require('lokijs');

const db = new Loki('tokenizationDB');
const tokens = db.addCollection('tokens');

module.exports = tokens;
