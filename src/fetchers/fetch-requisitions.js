const axios = require('axios');
const {getSessionTokenCookieName} = require('../config');

const SESSION_COOKIE = getSessionTokenCookieName();

function fecthRequisitions(sessionToken) {
  const config = {
    url: 'https://yotepresto.com/user/requisitions_listings',
    method: 'get',
    headers: {
      cookie: `${SESSION_COOKIE}=${sessionToken};`
    }
  };

  return axios(config);
}

module.exports = fecthRequisitions;
