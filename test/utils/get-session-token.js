const {getSessionToken} = require('../../src/use-cases');

global.SESSION_TOKEN = null;

const credentials = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};

module.exports = async function() {
  if (!global.SESSION_TOKEN) global.SESSION_TOKEN = await getSessionToken(credentials);
  return global.SESSION_TOKEN;
};
