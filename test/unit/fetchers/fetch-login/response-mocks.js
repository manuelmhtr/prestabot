const nock = require('nock');

const host = 'https://api.yotepresto.com';
const path = '/auth/sign_in';
const successfulResponse = {
  status: 200,
  headers: {
    client: '-7Ir9uON5T-GdCv4bi57lw',
    expiry: '1592268274',
    uid: 'example@email.com',
    'access-token': 'MMWNZjjMaeA5B5VYK9eARA',
    'token-type': 'Bearer',
  },
  data: {
    data: {
      id: 123,
      uid: 'example@email.com',
      provider: 'email',
      email: 'example@email.com',
      roles_name: ['Investor'],
      status: 'contract_signed',
      settings: {},
      last_sign_in_at: '2020-06-15T19:03:24.625-05:00',
      tickets_count: 0,
      requisition_status: null,
      next_requisition_available: false,
      zell_app_id: '12345',
      reference_code: 'MANUELMHTR',
      person_type: 'física'
    },
  },
};

const mockSuccess = ({ email, password }) => {
  const { status, data, headers } = successfulResponse;
  nock(host)
    .post(path, { email, password })
    .reply(status, data, headers);
};

module.exports = {
  mockSuccess,
};
