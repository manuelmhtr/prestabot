const cheerio = require('cheerio');

const REQUISITIONS_LIST_SELECTOR = 'table#requisitions-list tbody tr.req-item';
const ID_SELECTOR = 'td.id span';
const USER_ID_SELECTOR = 'td.borrower a';
const SCORE_SELECTOR = 'td.calif span';
const INTEREST_RATE_SELECTOR = 'td.rate a';
const AMOUNT_SELECTOR = 'td.amount a';
const PURPOSE_SELECTOR = 'td.purpose a';
const PAY_IN_MONTHS_SELECTOR = 'td.term a';
const DAYS_LEFT_SELECTOR = 'td.left a';
const ALREADY_LENT_CLASS = 'yalep';
const MISSING_AMOUNT_SELECTOR = {SIBLING: 'td.term', OK: 'a'};

function parseRequisitions(response) {
  const {data} = response;
  const $ = cheerio.load(data);
  return $(REQUISITIONS_LIST_SELECTOR).map(function() {
    return parseRequisition($(this));
  }).toArray();
};

const parseRequisition = ($) => {
  return {
    id: getId($),
    userId: getUserId($),
    score: getScore($),
    interestRate: getInterestRate($),
    amount: getAmount($),
    purpose: getPurpose($),
    payInMonths: getPayInMonths($),
    missingAmount: getMissingAmount($),
    daysLeft: getdaysLeft($),
    alreadyLent: getAlreadyLent($)
  };
};

const getId = $ => $.find(ID_SELECTOR).text().trim();

const getUserId = $ => $.find(USER_ID_SELECTOR).text().trim();

const getScore = $ => $.find(SCORE_SELECTOR).text().trim();

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

const parseNumber = str => parseFloat(str.replace(/[^0-9.]/g, ''));

module.exports = parseRequisitions;
