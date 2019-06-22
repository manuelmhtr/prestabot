const axios = require('axios');
const querystring = require('querystring');
const {getSessionTokenCookieName} = require('../config');

const SESSION_COOKIE = getSessionTokenCookieName();
const COMMIT = 'Autorizar';
const UTF8 = '✓';
const SUCCESS_STATUS = 200;

function fetchLend(params) {
  const {
    id,
    amount,
    password,
    sessionToken,
    applicationId,
    authenticityToken
  } = params;

  const data = querystring.stringify({
    'utf8': UTF8,
    'authenticity_token': authenticityToken,
    'ticket[requisition_id]': applicationId,
    'ticket[amount]': amount,
    'ticket[password]': password,
    'commit': COMMIT
  });

  const config = {
    data,
    url: 'https://www.yotepresto.com/user/tickets/add_and_approve',
    method: 'post',
    headers: {
      'cookie': `${SESSION_COOKIE}=${sessionToken};`,
      'content-type': 'application/x-www-form-urlencoded',
      'Upgrade-Insecure-Requests': '1',
      'Referer': `https://yotepresto.com/user/requisitions/${id}`,
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    }
  };

  return axios(config)
    .catch(() => ({ status: SUCCESS_STATUS }));
}

module.exports = fetchLend;
