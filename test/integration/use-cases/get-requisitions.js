const {getRequisitions} = require(`${ROOT_PATH}/src/use-cases`);

describe('Use Cases | getRequisitions', () => {
  let sessionToken;

  before(async () => {
    sessionToken = await testUtils.getSessionToken();
  });

  it('should get requisitions successfully', async () => {
    const requisitions = await getRequisitions(sessionToken);

    expect(requisitions).to.be.an('array');
    expect(requisitions.length > 0).to.be.equal(true);
    requisitions.forEach(expectRequisition);
  });
});

function expectRequisition(requisition) {
  expect(requisition).to.be.an('object');
  expect(requisition).to.be.have.property('id').and.to.be.a('string');
  expect(requisition).to.be.have.property('userId').and.to.be.a('string');
  expect(requisition).to.be.have.property('score').and.to.be.a('string');
  expect(requisition).to.be.have.property('interestRate').and.to.be.a('number');
  expect(requisition).to.be.have.property('amount').and.to.be.a('number');
  expect(requisition).to.be.have.property('purpose').and.to.be.a('string');
  expect(requisition).to.be.have.property('payInMonths').and.to.be.a('number');
  expect(requisition).to.be.have.property('missingAmount').and.to.be.a('number');
  expect(requisition).to.be.have.property('daysLeft').and.to.be.a('number');
  expect(requisition).to.be.have.property('alreadyLent').and.to.be.a('boolean');
}
