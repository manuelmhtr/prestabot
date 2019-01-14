const SET_COOKIE_HEADER = 'set-cookie';
const {getSessionTokenCookieName} = require('../config');

const SESSION_COOKIE = getSessionTokenCookieName();

function parseSessionToken(response) {
  const {headers} = response;
  const [cookiesRaw] = headers[SET_COOKIE_HEADER];
  const cookies = parseCookies(cookiesRaw);
  return cookies[SESSION_COOKIE];
}

function parseCookies(cookiesRaw) {
  return cookiesRaw.split(';').reduce((response, cookieRaw) => {
    const parts = cookieRaw.split('=');
    const key = parts.shift().trim();
    const value = decodeURI(parts.join('='));
    return { ...response, [key]: value };
  }, {});
}

module.exports = parseSessionToken;
