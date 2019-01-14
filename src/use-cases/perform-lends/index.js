const {get} = require('lodash');
const {getMinInterestRate, getMinCreditHistoryScore} = require('../../config');
const getSessionToken = require('../get-session-token');
const getRequisitions = require('../get-requisitions');
const getRequisitionDetails = require('../get-requisition-details');
const lend = require('../lend');

const MIN_INTEREST_RATE = getMinInterestRate();
const MIN_CREDIT_HISTORY_SCORE = getMinCreditHistoryScore();

function performLends(params) {
  const {credentials} = params;

  const execute = async () => {
    const sessionToken = await getSessionToken(credentials);
    const requisitions = await getRequisitions(sessionToken);
    const possibleOnes = requisitions.filter(simpleFilter);
    const populatedRequisitions = await populateRequisitions(sessionToken, possibleOnes);
    const bestOnes = populatedRequisitions.filter(detailedFilter);
    const sortedRequisitions = sortRequisitions(bestOnes);
    console.log(sortedRequisitions);
  };

  const simpleFilter = (requisition) => {
    const {alreadyLent, interestRate} = requisition;
    if (alreadyLent) return false;
    if (interestRate < MIN_INTEREST_RATE) return false;
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
    if (creditScore < MIN_CREDIT_HISTORY_SCORE) return false;
    return true;
  };

  const sortRequisitions = (requisitions) => {
    return requisitions.sort((a, b) => a.interestRate < b.interestRate);
  };

  const lendRequisitions = (requisitions) => {
    return requisitions.reduce(async (waitForLast, requisition) => {
      await waitForLast;
      const {id} = requisition
    }, Promise.resolve());
  };

  return execute();
};

module.exports = performLends;
