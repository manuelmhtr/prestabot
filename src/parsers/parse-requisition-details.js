const cheerio = require('cheerio');

const ID_SELECTOR = 'header h1';
const USER_ID_SELECTOR = 'div.card__header span.user';
const DESCRIPTION_SELECTOR = 'div.card.detail.mb-3 div.card__body p';
const USER_DETAILS_SELECTOR = 'div#descripcion tbody';
const CREDIT_HISTORY_SELECTOR = 'div#historial tbody tr';
const AUTHENTICITY_TOKEN_SELECTOR = 'form#ticket-authorization input[name=\'authenticity_token\']';
const APPLICATION_ID_SELECTOR = (id) => `form#ticket-authorization input#app-id-${id}`;

function parseRequisitionDetails(response, id) {
  const {data} = response;
  const $ = cheerio.load(data);

  return {
    id: getId($),
    applicationId: getApplicationId($, id),
    userId: getUserId($),
    description: getDescription($),
    userDetails: getUserDetails($),
    creditHistory: getCreditHistory($),
    authenticityToken: getAuthenticityToken($)
  };
};

const getId = $ => parseId($(ID_SELECTOR).text().trim());

const getApplicationId = ($, id) => $(APPLICATION_ID_SELECTOR(id)).attr('value');

const getUserId = $ => $(USER_ID_SELECTOR).text().trim();

const getDescription = $ => $(DESCRIPTION_SELECTOR).last().text().trim();

const getUserDetails = ($) => {
  const table1 = $(USER_DETAILS_SELECTOR).first();
  const ageRow = table1.find('tr').first();
  const dependentsRow = ageRow.next();
  const insuranseRow = dependentsRow.next();
  const jobAgeRow = insuranseRow.next();
  const studiesRow = jobAgeRow.next();

  const table2 = $(USER_DETAILS_SELECTOR).last();
  const stateRow = table2.find('tr').first();
  const addressTypeRow = stateRow.next();
  const professionRow = addressTypeRow.next();
  const carRow = professionRow.next();
  const jobTypeRow = carRow.next();

  return {
    age: parseInt(getLastColumnText(ageRow), 10),
    dependents: parseInt(getLastColumnText(dependentsRow), 10),
    hasMedicalInsuranse: parseBoolean(getLastColumnText(insuranseRow)),
    jobAge: parseInt(getLastColumnText(jobAgeRow), 10),
    studiesLevel: getLastColumnText(studiesRow),
    addressState: getLastColumnText(stateRow),
    addressType: getLastColumnText(addressTypeRow),
    profession: getLastColumnText(professionRow),
    hasOwnCar: parseBoolean(getLastColumnText(carRow)),
    jobType: getLastColumnText(jobTypeRow)
  };
};

const getCreditHistory = ($) => {
  const table = $(CREDIT_HISTORY_SELECTOR);
  const scoreRow = table.first();
  const durationRow = scoreRow.next();
  const queriesRow = durationRow.next();
  const accountsRow = queriesRow.next();

  return {
    score: parseInt(getLastColumnText(scoreRow), 10),
    durationYears: parseInt(getLastColumnText(durationRow), 10),
    queries: parseInt(getLastColumnText(queriesRow), 10),
    openedAccounts: parseInt(getLastColumnText(accountsRow), 10)
  };
};

const getAuthenticityToken = $ => $(AUTHENTICITY_TOKEN_SELECTOR).attr('value');

const parseId = str => str.replace(/[^0-9]/g, '');

const getLastColumnText = item => item.find('td').last().text().trim();

const parseBoolean = str => str === 'Si';

module.exports = parseRequisitionDetails;
