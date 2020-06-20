const nock = require('nock');

const host = 'https://api.yotepresto.com';
const path = '/v2/investor/ticket_authorization';
const successfulResponse = {
  status: 200,
  headers: {
    client: '-7Ir9uON5T-GdCv4bi57lw',
    expiry: '1592268274',
    uid: 'example@email.com',
    'access-token': 'MMWNZjjMaeA5B5VYK9eARA',
    'token-type': 'Bearer',
  },
  data: null
};

const mockSuccess = ({ otp, accessToken }) => {
  const { status, data, headers } = successfulResponse;
  nock(host, { reqheaders: TestUtils.getExpectedHeaders(accessToken) })
    .post(path, { otp_code: otp })
    .reply(status, data, headers);
};

module.exports = {
  mockSuccess,
};
