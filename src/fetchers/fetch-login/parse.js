const { getAccessToken } = require('../../parsers');

module.exports = (response) => {
  const { headers, data } = response;

  return {
    user: data?.data,
    accessToken: getAccessToken(headers)
  };
};
