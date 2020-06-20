const fetch = require('./fetch');
const parse = require('./parse');

module.exports = async (credentials) => {
  const response = await fetch(credentials);
  return parse(response);
};
