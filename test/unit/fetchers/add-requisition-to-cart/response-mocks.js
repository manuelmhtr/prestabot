const nock = require('nock');

const host = 'https://api.yotepresto.com';
const path = '/v2/investor/shopping_cards';
const successfulResponse = {
  status: 200,
  headers: {
    client: '-7Ir9uON5T-GdCv4bi57lw',
    expiry: '1592268274',
    uid: 'example@email.com',
    'access-token': 'MMWNZjjMaeA5B5VYK9eARA',
    'token-type': 'Bearer',
  },
  data: [
    {
      id: 2028381,
      amount: '200.0',
      status: 'added',
      user_id: 464441,
      requisition_id: 1113961,
      created_at: '2020-06-19T18:09:50.009-05:00',
      updated_at: '2020-06-19T18:09:50.009-05:00',
      qualification: 'B5',
      zell_app_id: 1300310,
      origin: 'front_end',
      token: 'EeFyDPmqYxBAUwTfY2KqN3kk'
    },
    {
      id: 2028382,
      amount: '200.0',
      status: 'added',
      user_id: 464441,
      requisition_id: 1130023,
      created_at: '2020-06-19T18:10:16.206-05:00',
      updated_at: '2020-06-19T18:10:16.206-05:00',
      qualification: 'B4',
      zell_app_id: 1317670,
      origin: 'front_end',
      token: 'EvY2qmbDXqsWBbPXUwcVgiju'
    }
  ]
};

const mockSuccess = ({ requisitionId, amount, accessToken }) => {
  const { status, data, headers } = successfulResponse;
  const ticket = {
    amount,
    requisition_id: requisitionId,
    origin: 'front_end',
  };
  nock(host, { reqheaders: TestUtils.getExpectedHeaders(accessToken) })
    .post(path, { ticket })
    .reply(status, data, headers);
};

module.exports = {
  mockSuccess,
};
