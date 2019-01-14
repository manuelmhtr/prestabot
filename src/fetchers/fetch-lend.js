
/** curl 'https://yotepresto.com/user/tickets/add_and_approve'
 * -H 'authority: yotepresto.com'
 * -H 'cache-control: max-age=0'
 * -H 'origin: https://yotepresto.com'
 * -H 'upgrade-insecure-requests: 1'
 * -H 'content-type: application/x-www-form-urlencoded'
 * -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
 * -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*\/*;q=0.8'
 * -H 'referer: https://yotepresto.com/user/requisitions/548363'
 * -H 'accept-encoding: gzip, deflate, br'
 * -H 'accept-language: en-US,en;q=0.9,es;q=0.8'
 * -H 'cookie: gsScrollPos-1135=0; _YoTePrestoClient_session=a11e3b44b966ed29bac860b46b842ce5; cto_lwid=d76cfb74-f2a1-4156-aa5e-a3e292dff8c3; _ga=GA1.2.1667228970.1547310492; _gid=GA1.2.1615600082.1547310492; intercom-id-v7tv8mvt=0ba5e268-17ce-4978-a7fb-0b6dc47fa9d2; _fbp=fb.1.1547407392186.188349585; mp_3913f5f98d42e7fc3923c16e10d8f386_mixpanel=%7B%22distinct_id%22%3A%20%22manuelmhtr%40gmail.com%22%2C%22%24device_id%22%3A%20%2216842e46cbc42-0315a8298f8b9f-10336653-1fa400-16842e46cbd739%22%2C%22%24user_id%22%3A%20%22manuelmhtr%40gmail.com%22%2C%22User%20Role%22%3A%20%22investor%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fyotepresto.com%2Fsesion-inversionistas%22%2C%22%24initial_referring_domain%22%3A%20%22yotepresto.com%22%7D'
 * --data 'utf8=%E2%9C%93&authenticity_token=44iW%2BsZG0ayACc1pFekKSdRuJuVEEGElcqP57Y%2B6ZFnzsGDA7Rrkk9nvvQMhPImR9qh26zgEPSRiiqSOYuGf%2Fw%3D%3D&ticket%5Brequisition_id%5D=401342&ticket%5Bamount%5D=200&ticket%5Bpassword%5D=1h4leunaMT%24%260&commit=Autorizar' --compressed */

const axios = require('axios');
const querystring = require('querystring');
const {getSessionTokenCookieName} = require('../config');

const SESSION_COOKIE = getSessionTokenCookieName();
const COMMIT = 'Autorizar';
const UTF8 = '✓';

function fetchLend(params) {
  const {sessionToken, password, amount, id} = params;
  const data = querystring.stringify({
    'utf8': UTF8,
    // 'authenticity_token': '',
    'ticket[requisition_id]': id,
    'ticket[amount]': amount,
    'ticket[password]': password,
    'commit': COMMIT
  });

  const config = {
    data,
    url: 'https://yotepresto.com/user/tickets/add_and_approve',
    method: 'post',
    headers: {
      'cookie': `${SESSION_COOKIE}=${sessionToken};`,
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
    }
  };

  return axios(config);
}

module.exports = fetchLend;
