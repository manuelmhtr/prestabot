module.exports = (headers = {}) => ({
  client: headers.client,
  expiry: headers.expiry,
  uid: headers.uid,
  accessToken: headers['access-token'],
  tokenType: headers['token-type'],
});
