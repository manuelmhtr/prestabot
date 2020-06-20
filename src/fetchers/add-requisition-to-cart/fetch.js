const { request } = require('../yotepresto-fetcher');

module.exports = ({ requisitionId, amount, accessToken }) => request({
  accessToken,
  method: 'post',
  path: '/v2/investor/shopping_cards',
  data: {
    ticket: {
      amount,
      requisition_id: requisitionId,
      origin: 'front_end',
    },
  },
});
