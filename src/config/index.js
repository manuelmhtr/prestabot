const data = require('./data');
const {env} = process;

const getCredentials = () => ({
  email: env.EMAIL,
  password: env.PASSWORD
});

const getSessionTokenCookieName = () => data.sessionTokenCookieName;

const getInterestRateClassifications = () => data.interestRateClassifications;

const getLoanAmounts = () => data.loanAmounts;

const getMinCreditHistoryScore = () => data.minCreditHistoryScore;

module.exports = {
  getCredentials,
  getSessionTokenCookieName,
  getInterestRateClassifications,
  getLoanAmounts,
  getMinCreditHistoryScore
};
