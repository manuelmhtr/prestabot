const { fetchLogin } = require(`${ROOT_PATH}/src/fetchers`);
const responseMocks = require('./response-mocks');

const credentials = {
  email: 'example@email.com',
  password: 'password'
};

describe('Fetchers | fetchLogin', () => {
  beforeEach(() => {
    responseMocks.mockSuccess(credentials);
  });

  it('returns an object with the access token', async () => {
    const data = await fetchLogin(credentials);

    expect(data.accessToken).toMatchObject({
      client: '-7Ir9uON5T-GdCv4bi57lw',
      expiry: '1592268274',
      uid: 'example@email.com',
      accessToken: 'MMWNZjjMaeA5B5VYK9eARA',
      tokenType: 'Bearer',
    });
  });

  it('returns an object with the user', async () => {
    const data = await fetchLogin(credentials);

    expect(data.user.id).toBe(123);
  });
});
