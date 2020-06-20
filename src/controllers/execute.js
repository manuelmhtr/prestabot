const { performLends } = require('../use-cases');
const { getCredentials, getOtpSecret } = require('../config');

function execute() {
  const credentials = getCredentials();
  const otpSecret = getOtpSecret();
  return performLends({ credentials, otpSecret });
}

module.exports = execute;
