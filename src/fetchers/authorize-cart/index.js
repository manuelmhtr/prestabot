const fetch = require('./fetch');
const parse = require('./parse');

module.exports = async ({ otp, accessToken }) => {
  const response = await fetch({ otp, accessToken });
  return parse(response);
};
