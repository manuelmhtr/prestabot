const fs = require('fs');
const path = require('path');
const {parseRequisitionDetails} = require(`${ROOT_PATH}/src/parsers`);

const EXPECTED_DETAILS = {
  id: '764702',
  applicationId: '607362',
  userId: 'MRS-607362',
  description: 'Soy Mario hace 4 años invertí en una franquicia y en este momento tengo la oportunidad de invertir en otra sucursal, sin embargo me quede corto en el proyecto con 300,000 por lo que estoy buscando la manera de obtenerlos para continuar con mi proyecto ya que los intereses del banco están demasiado altos.',
  userDetails: {
    age: 30,
    dependents: 0,
    hasMedicalInsuranse: true,
    jobAge: 4,
    studiesLevel: 'Profesional',
    addressState: 'Jalisco',
    addressType: 'Vivo con familia',
    profession: '',
    hasOwnCar: false,
    jobType: 'Tengo un negocio'
  },
  creditHistory: {
    score: 720,
    durationYears: 11,
    queries: 6,
    openedAccounts: 6
  },
  authenticityToken: 'GMxH07TeOGmmmSyO8f5qww6vPV1QZbrGAYCjByCju9zOe9ByX8ZQw/JLFi20swwKDFLUfsEqYseQZ5VbjQ3j5w=='
};

describe('Parsers | parseRequisitionDetails', () => {
  let response;

  before(() => {
    const filePath = path.join(__dirname, './response.html');
    const data = fs.readFileSync(filePath).toString();
    response = { data };
  });

  it('should parse html requisition details', () => {
    const requisition = parseRequisitionDetails(response, EXPECTED_DETAILS.id);

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
