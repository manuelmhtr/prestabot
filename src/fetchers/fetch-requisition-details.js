const axios = require('axios');
const {getSessionTokenCookieName} = require('../config');

const SESSION_COOKIE = getSessionTokenCookieName();

function fetchRequisitionDetails(sessionToken, id) {
  const config = {
    url: `https://www.yotepresto.com/user/requisitions/${id}`,
    method: 'get',
    headers: {
      cookie: `${SESSION_COOKIE}=${sessionToken};`
    }
  };

  return axios(config);
}

module.exports = fetchRequisitionDetails;
