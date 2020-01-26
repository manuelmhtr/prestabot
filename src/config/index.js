const data = require('./data');
const {env} = process;

const getCredentials = () => ({
  email: env.EMAIL,
  password: env.PASSWORD
});

const getSessionTokenCookieName = () => data.sessionTokenCookieName;

const getMinInterestRate = () => parseFloat(env.MIN_INTEREST);

const getLendAmount = () => parseInt(env.LEND_AMOUNT, 10);

const getMinCreditScore = () => parseInt(env.MIN_CREDIT_SCORE, 10);

module.exports = {
  getCredentials,
  getSessionTokenCookieName,
  getMinInterestRate,
  getLendAmount,
  getMinCreditScore
};
