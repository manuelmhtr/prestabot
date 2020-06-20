const { request } = require('../yotepresto-fetcher');

module.exports = ({ email, password }) => request({
  method: 'post',
  path: '/auth/sign_in',
  data: { email, password },
});
