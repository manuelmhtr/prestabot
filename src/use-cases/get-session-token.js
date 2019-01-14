const {fetchLogin} = require('../fetchers');
const {parseSessionToken} = require('../parsers');

async function getSessionToken(credentials) {
  const response = await fetchLogin(credentials);
  return parseSessionToken(response);
}

module.exports = getSessionToken;
