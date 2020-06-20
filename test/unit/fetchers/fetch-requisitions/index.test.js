const { fetchRequisitions } = require(`${ROOT_PATH}/src/fetchers`);
const responseMocks = require('./response-mocks');

const accessToken = {
  client: 'CLIENT',
  expiry: 'EXPIRY',
  uid: 'UID',
  accessToken: 'ACCESS_TOKEN',
  tokenType: 'TOKEN_TYPE',
};

describe('Fetchers | fetchRequisitions', () => {
  beforeEach(() => {
    responseMocks.mockSuccess({ accessToken });
  });

  it('returns an object with the access token', async () => {
    const data = await fetchRequisitions({ accessToken });

    expect(data.accessToken).toMatchObject({
      client: '-7Ir9uON5T-GdCv4bi57lw',
      expiry: '1592268274',
      uid: 'example@email.com',
      accessToken: 'MMWNZjjMaeA5B5VYK9eARA',
      tokenType: 'Bearer',
    });
  });

  it('returns the parsed requisitions', async () => {
    const { requisitions } = await fetchRequisitions({ accessToken });

    expect(requisitions).toHaveLength(3);
    expect(requisitions[0]).toMatchObject({
      id: 1097112,
      zellAppId: '1282244',
      qualification: 'B2',
      interestRate: 16.9,
      purpose: 'PAGAR DEUDAS',
      term: 12,
      amount: 100000.0,
      missingAmount: 44600.00,
      fundedAmount: 400.0,
      alreadyLent: true,
      daysToEnd: 13,
      hidden: false,
      creditReport: {
        score: 722,
        age: 20,
      },
    });
  });
});
