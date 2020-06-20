const {env} = process;

const getCredentials = () => ({
  email: env.EMAIL,
  password: env.PASSWORD
});

const getOtpSecret = () => env.OTP_SECRET;

const getTermRange = () => ({
  min: env.MIN_TERM ? parseInt(env.MIN_TERM, 10) : null,
  max: env.MAX_TERM ? parseInt(env.MAX_TERM, 10) : null,
});

const getMinInterestRate = () => parseFloat(env.MIN_INTEREST);

const getLendAmount = () => parseInt(env.LEND_AMOUNT, 10);

const getMinCreditScore = () => parseInt(env.MIN_CREDIT_SCORE, 10);

module.exports = {
  getCredentials,
  getOtpSecret,
  getTermRange,
  getMinInterestRate,
  getLendAmount,
  getMinCreditScore,
};
