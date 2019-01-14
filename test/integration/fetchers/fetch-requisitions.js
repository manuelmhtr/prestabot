const {fetchRequisitions} = require(`${ROOT_PATH}/src/fetchers`);

describe('Fetchers | fetchRequisitions', () => {
  let sessionToken;

  before(async () => {
    sessionToken = await testUtils.getSessionToken();
  });

  it('should return requisitions document sucessfully', async () => {
    const EXPECTED_STATUS = 200;
    const EXPECTED_TITLE = '<title>Yo Te Presto</title>';

    const response = await fetchRequisitions(sessionToken);
    const {status, data} = response;

    expect(status).to.be.equal(EXPECTED_STATUS);
    expect(data.indexOf(EXPECTED_TITLE) !== -1).to.be.equal(true);
  });
});
