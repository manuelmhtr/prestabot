const axios = require('axios');
const HOST = 'https://api.yotepresto.com';

const buildHeaders = (accessToken = {}) => ({
  uid: accessToken.uid || '',
  client: accessToken.client || '',
  expiry: accessToken.expiry || '',
  'token-type': accessToken.tokenType || '',
  'access-token': accessToken.accessToken || '',
});

const request = ({
  data,
  path,
  method,
  params,
  accessToken,
}) => axios({
  method,
  data,
  params,
  url: `${HOST}${path}`,
  headers: buildHeaders(accessToken),
});

module.exports = {
  request,
};
