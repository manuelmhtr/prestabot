const fetch = require('./fetch');
const parse = require('./parse');

module.exports = async ({ accessToken }) => {
  const response = await fetch({ accessToken });
  return parse(response);
};
