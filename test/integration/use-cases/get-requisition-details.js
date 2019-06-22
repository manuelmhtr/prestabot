const {getRequisitionDetails} = require(`${ROOT_PATH}/src/use-cases`);

const REQUISITION_ID = '764702';

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
  const {userDetails, creditHistory} = requisition || {};

  expect(requisition).to.be.an('object');
  expect(requisition).to.be.have.property('id').and.to.be.a('string');
  expect(requisition).to.be.have.property('applicationId').and.to.be.a('string');
  expect(requisition).to.be.have.property('userId').and.to.be.a('string');
  expect(requisition).to.be.have.property('description').and.to.be.a('string');
  expect(requisition).to.be.have.property('authenticityToken').and.to.be.a('string');

  expect(userDetails).to.be.an('object');
  expect(userDetails).to.be.have.property('age').and.to.be.a('number');
  expect(userDetails).to.be.have.property('dependents').and.to.be.a('number');
  expect(userDetails).to.be.have.property('hasMedicalInsuranse').and.to.be.a('boolean');
  expect(userDetails).to.be.have.property('jobAge').and.to.be.a('number');
  expect(userDetails).to.be.have.property('studiesLevel').and.to.be.a('string');
  expect(userDetails).to.be.have.property('addressState').and.to.be.a('string');
  expect(userDetails).to.be.have.property('addressType').and.to.be.a('string');
  expect(userDetails).to.be.have.property('profession').and.to.be.a('string');
  expect(userDetails).to.be.have.property('hasOwnCar').and.to.be.a('boolean');
  expect(userDetails).to.be.have.property('jobType').and.to.be.a('string');

  expect(creditHistory).to.be.an('object');
  expect(creditHistory).to.be.have.property('score').and.to.be.a('number');
  expect(creditHistory).to.be.have.property('durationYears').and.to.be.a('number');
  expect(creditHistory).to.be.have.property('queries').and.to.be.a('number');
  expect(creditHistory).to.be.have.property('openedAccounts').and.to.be.a('number');
}
