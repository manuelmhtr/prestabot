const { getAccessToken } = require('../../parsers');

module.exports = (response) => {
  const { headers, data } = response;

  return {
    cart: data,
    accessToken: getAccessToken(headers),
  }
};
