const { request } = require('../yotepresto-fetcher');

module.exports = ({ accessToken }) => request({
  accessToken,
  method: 'get',
  path: '/v2/investor/requisition_listings',
});
