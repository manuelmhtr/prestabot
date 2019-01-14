const axios = require('axios');
const querystring = require('querystring');

const COMMIT = 'Iniciar Sesión';
const UTF8 = '✓';

function fetchLogin(credentials) {
  const {email, password} = credentials;
  const data = querystring.stringify({
    'utf8': UTF8,
    'sessions[email]': email,
    'sessions[password]': password,
    'commit': COMMIT
  });

  const config = {
    data,
    url: 'https://yotepresto.com/sign_in',
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
    }
  };

  return axios(config);
}

module.exports = fetchLogin;
