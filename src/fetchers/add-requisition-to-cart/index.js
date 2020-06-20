const fetch = require('./fetch');
const parse = require('./parse');

module.exports = async ({ requisitionId, amount, accessToken }) => {
  const response = await fetch({ requisitionId, amount, accessToken });
  return parse(response);
};
