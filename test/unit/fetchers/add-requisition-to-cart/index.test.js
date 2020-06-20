const { addRequisitionToCart } = require(`${ROOT_PATH}/src/fetchers`);
const responseMocks = require('./response-mocks');

const accessToken = {
  client: 'CLIENT',
  expiry: 'EXPIRY',
  uid: 'UID',
  accessToken: 'ACCESS_TOKEN',
  tokenType: 'TOKEN_TYPE',
};

const requisitionId = '123';
const amount = 1000;

describe('Fetchers | addRequisitionToCart', () => {
  beforeEach(() => {
    responseMocks.mockSuccess({ requisitionId, amount, accessToken });
  });

  it('returns an object with the access token', async () => {
    const data = await addRequisitionToCart({ requisitionId, amount, accessToken });

    expect(data.accessToken).toMatchObject({
      client: '-7Ir9uON5T-GdCv4bi57lw',
      expiry: '1592268274',
      uid: 'example@email.com',
      accessToken: 'MMWNZjjMaeA5B5VYK9eARA',
      tokenType: 'Bearer',
    });
  });

  it('returns the cart', async () => {
    const { cart } = await addRequisitionToCart({ requisitionId, amount, accessToken });
    expect(cart).toHaveLength(2);
  });
});
