const cheerio = require('cheerio');

const ID_SELECTOR = 'header h1';
const USER_ID_SELECTOR = 'div.card__header span.user';
const DESCRIPTION_SELECTOR = 'div.card__body p';
const USER_DETAILS_SELECTOR = 'div#descripcion tbody';
const CREDIT_HISTORY_SELECTOR = 'div#historial tbody tr';

const PURPOSE_SELECTOR = 'td.purpose a';
const PAY_IN_MONTHS_SELECTOR = 'td.term a';
const DAYS_LEFT_SELECTOR = 'td.left a';
const ALREADY_LENT_CLASS = 'yalep';
const MISSING_AMOUNT_SELECTOR = {SIBLING: 'td.term', OK: 'a'};

function parseRequisitionDetails(response) {
  const {data} = response;
  const $ = cheerio.load(data);

  return {
    id: getId($),
    userId: getUserId($),
    description: getDescription($),
    userDetails: getUserDetails($),
    creditHistory: getCreditHistory($)
  };
};

const getId = $ => parseId($(ID_SELECTOR).text().trim());

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

const getInterestRate = $ => parseNumber($.find(INTEREST_RATE_SELECTOR).text().trim());

const getAmount = $ => parseNumber($.find(AMOUNT_SELECTOR).text().trim());

const getPurpose = $ => $.find(PURPOSE_SELECTOR).text().trim().toUpperCase();

const getPayInMonths = $ => parseNumber($.find(PAY_IN_MONTHS_SELECTOR).text().trim());

const getMissingAmount = $ => parseNumber($
  .find(MISSING_AMOUNT_SELECTOR.SIBLING).next()
  .find(MISSING_AMOUNT_SELECTOR.OK).text().trim()
);

const getdaysLeft = $ => parseNumber($.find(DAYS_LEFT_SELECTOR).text().trim());

const getAlreadyLent = $ => $.hasClass(ALREADY_LENT_CLASS);

const parseId = str => str.replace(/[^0-9]/g, '');

const parseNumber = str => parseFloat(str.replace(/[^0-9.]/g, ''));

const getLastColumnText = item => item.find('td').last().text().trim();

const parseBoolean = str => str === 'Si';

module.exports = parseRequisitionDetails;
