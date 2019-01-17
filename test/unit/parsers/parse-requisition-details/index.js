const fs = require('fs');
const path = require('path');
const {parseRequisitionDetails} = require(`${ROOT_PATH}/src/parsers`);

const ID = '562776';

const EXPECTED_DETAILS = {
  id: '562776',
  applicationId: '414513',
  userId: 'ccollada-414513',
  description: 'Give me the money!!',
  userDetails: {
    age: 29,
    dependents: 0,
    hasMedicalInsuranse: true,
    jobAge: 3,
    studiesLevel: 'Profesional',
    addressState: 'Mexico',
    addressType: 'Vivo con familia',
    profession: '',
    hasOwnCar: false,
    jobType: 'Tengo un negocio'
  },
  creditHistory: {
    score: 705,
    durationYears: 10,
    queries: 5,
    openedAccounts: 22
  },
  authenticityToken: '9GFU4w6jDYheql90zlnXfYfVSn1LrtI7G5toRmeJoXHkWaLZJf84twdMLx76jFSlpRMacze6jjoLsjUlitJa1w=='
};

describe('Parsers | parseRequisitionDetails', () => {
  let response;

  before(() => {
    const filePath = path.join(__dirname, './response.html');
    const data = fs.readFileSync(filePath).toString();
    response = { data };
  });

  it('should parse html requisition details', () => {
    const requisition = parseRequisitionDetails(response, ID);

    expectRequisitionDetails(requisition);
    expect(requisition).to.be.deep.equal(EXPECTED_DETAILS);
  });
});

function expectRequisitionDetails(requisition) {
  expect(requisition).to.be.an('object');
  expect(requisition).to.be.have.property('id').and.to.be.a('string');
  expect(requisition).to.be.have.property('userId').and.to.be.a('string');
  expect(requisition).to.be.have.property('description').and.to.be.a('string');
  expect(requisition).to.be.have.property('userDetails').and.to.be.an('object');
  expect(requisition).to.be.have.property('creditHistory').and.to.be.an('object');
}
