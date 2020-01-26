const {get} = require('lodash');
const getSessionToken = require('../get-session-token');
const getRequisitions = require('../get-requisitions');
const getRequisitionDetails = require('../get-requisition-details');
const lend = require('../lend');
const {
  getMinInterestRate,
  getMinCreditScore,
  getLendAmount
} = require('../../config');

const MIN_INTEREST_RATE = getMinInterestRate();
const MIN_CREDIT_SCORE = getMinCreditScore();
const AVOID_PURPOSES = ['NEGOCIO', 'OTROS'];

function performLends(params) {
  const {credentials} = params;
  const {password} = credentials;

  const execute = async () => {
    const sessionToken = await getSessionToken(credentials);
    const requisitions = await getRequisitions(sessionToken);
    const possibleOnes = requisitions.filter(simpleFilter);
    const populatedRequisitions = await populateRequisitions(sessionToken, possibleOnes);
    const bestOnes = populatedRequisitions.filter(detailedFilter);
    const sortedRequisitions = sortRequisitions(bestOnes);
    return lendRequisitions(sessionToken, sortedRequisitions);
  };

  const simpleFilter = (requisition) => {
    const {alreadyLent, interestRate, purpose} = requisition;
    if (alreadyLent) return false;
    if (interestRate < MIN_INTEREST_RATE) return false;
    if (AVOID_PURPOSES.includes(purpose)) return false;
    return true;
  };

  const populateRequisitions = (sessionToken, requisitions) => {
    return Promise.all(requisitions.map(async requisition => {
      const {id} = requisition;
      const details = await getRequisitionDetails(sessionToken, id);
      return { ...requisition, ...details };
    }));
  };

  const detailedFilter = (requisition) => {
    const creditScore = get(requisition, 'creditHistory.score');
    if (creditScore < MIN_CREDIT_SCORE) return false;
    return true;
  };

  const sortRequisitions = (requisitions) => {
    return requisitions.sort((a, b) => a.interestRate < b.interestRate);
  };

  const lendRequisitions = (sessionToken, requisitions) => {
    return requisitions.reduce(async (waitForLast, requisition) => {
      await waitForLast;
      const {id, applicationId, authenticityToken} = requisition;
      const amount = getLendAmount();
      const params = {
        id,
        amount,
        password,
        sessionToken,
        applicationId,
        authenticityToken
      };
      return lend(params);
    }, Promise.resolve());
  };

  return execute();
};

module.exports = performLends;
