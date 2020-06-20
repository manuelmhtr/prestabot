const { authorizeCart } = require(`${ROOT_PATH}/src/fetchers`);
const responseMocks = require('./response-mocks');

const accessToken = {
  client: 'CLIENT',
  expiry: 'EXPIRY',
  uid: 'UID',
  accessToken: 'ACCESS_TOKEN',
  tokenType: 'TOKEN_TYPE',
};

const otp = '123456';

describe('Fetchers | authorizeCart', () => {
  beforeEach(() => {
    responseMocks.mockSuccess({ otp, accessToken });
  });

  it('returns an object with the access token', async () => {
    const data = await authorizeCart({ otp, accessToken });

    expect(data.accessToken).toMatchObject({
      client: '-7Ir9uON5T-GdCv4bi57lw',
      expiry: '1592268274',
      uid: 'example@email.com',
      accessToken: 'MMWNZjjMaeA5B5VYK9eARA',
      tokenType: 'Bearer',
    });
  });

  it('returns success', async () => {
    const { success } = await authorizeCart({ otp, accessToken });
    expect(success).toBe(true);
  });
});
