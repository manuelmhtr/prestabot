const fs = require('fs');
const path = require('path');
const {parseRequisitions} = require(`${ROOT_PATH}/src/parsers`);

const REQUISITIONS_COUNT = 28;
const REQUISITION_EXAMPLE = {
  id: '555337',
  userId: 'rfcpraxairmx-407617',
  score: 'C2',
  interestRate: 23.9,
  amount: 50000,
  purpose: 'OTROS',
  payInMonths: 36,
  missingAmount: 6600,
  daysLeft: 24,
  alreadyLent: true
};

describe('Parsers | parseRequisitions', () => {
  let response;

  before(() => {
    const filePath = path.join(__dirname, './response.html');
    const data = fs.readFileSync(filePath).toString();
    response = { data };
  });

  it('should parse html requisitions', () => {
    const requisitions = parseRequisitions(response);

    expect(requisitions).to.be.an('array');
    expect(requisitions.length).to.be.equal(REQUISITIONS_COUNT);
    expect(requisitions).to.include.deep.members([REQUISITION_EXAMPLE]);
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
