const {getSessionToken} = require(`${ROOT_PATH}/src/use-cases`);

const credentials = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};

describe('Use Cases | getSessionToken', () => {
  it('should get session token successfully', async () => {
    const EXPECTED_LENGTH = 32;

    const sessionToken = await getSessionToken(credentials);

    expect(sessionToken).to.be.a('string');
    expect(sessionToken.length).to.be.equal(EXPECTED_LENGTH);
  });
});
