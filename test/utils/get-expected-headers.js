module.exports = (accessToken) => ({
  uid: accessToken.uid,
  client: accessToken.client,
  expiry: accessToken.expiry,
  'token-type': accessToken.tokenType,
  'access-token': accessToken.accessToken,
});
