const { request } = require('../yotepresto-fetcher');

module.exports = ({ otp, accessToken }) => request({
  accessToken,
  method: 'post',
  path: '/v2/investor/ticket_authorization',
  data: {
    otp_code: otp,
  },
});
