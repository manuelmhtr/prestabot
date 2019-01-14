const data = require('./data');
const {env} = process;

const getCredentials = () => ({
  email: env.EMAIL,
  password: env.PASSWORD
});

const getSessionTokenCookieName = () => data.sessionTokenCookieName;

const getMinInterestRate = () => data.minInterestRate;

const getMinCreditHistoryScore = () => data.minCreditHistoryScore;

module.exports = {
  getCredentials,
  getSessionTokenCookieName,
  getMinInterestRate,
  getMinCreditHistoryScore
};
