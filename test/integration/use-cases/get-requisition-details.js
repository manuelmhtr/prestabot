const {getRequisitionDetails} = require(`${ROOT_PATH}/src/use-cases`);

const REQUISITION_ID = '562776';

describe('Use Cases | getRequisitionDetails', () => {
  let sessionToken;

  before(async () => {
    sessionToken = await testUtils.getSessionToken();
  });

  it('should get requisitions successfully', async () => {
    const requisition = await getRequisitionDetails(sessionToken, REQUISITION_ID);

    expectRequisitionDetails(requisition);
  });
});

function expectRequisitionDetails(requisition) {
  expect(requisition).to.be.an('object');
  expect(requisition).to.be.have.property('id').and.to.be.a('string');
  expect(requisition).to.be.have.property('userId').and.to.be.a('string');
  expect(requisition).to.be.have.property('score').and.to.be.a('string');
  expect(requisition).to.be.have.property('rate').and.to.be.a('number');
  expect(requisition).to.be.have.property('amount').and.to.be.a('number');
  expect(requisition).to.be.have.property('purpose').and.to.be.a('string');
  expect(requisition).to.be.have.property('payInMonth').and.to.be.a('number');
  expect(requisition).to.be.have.property('missingAmount').and.to.be.a('number');
  expect(requisition).to.be.have.property('daysLeft').and.to.be.a('number');
  expect(requisition).to.be.have.property('hasLent').and.to.be.a('boolean');
}
