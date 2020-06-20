const { getAccessToken } = require('../../parsers');

module.exports = (response) => {
  const { headers, status } = response;

  return {
    success: status === 200,
    accessToken: getAccessToken(headers),
  }
};
