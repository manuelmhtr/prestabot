const { get } = require('lodash');
const totp = require('totp-generator');
const {
  addRequisitionToCart,
  authorizeCart,
  fetchCart,
  fetchLogin,
  fetchRequisitions,
} = require('../fetchers');
const {
  getMinInterestRate,
  getMinCreditScore,
  getLendAmount,
  getTermRange,
} = require('../config');

const MIN_INTEREST_RATE = getMinInterestRate();
const MIN_CREDIT_SCORE = getMinCreditScore();
const TERM_RANGE = getTermRange();
const LEND_AMOUNT = getLendAmount();
const AVOID_PURPOSES = ['NEGOCIO', 'OTROS'];

function performLends(params) {
  const { credentials, otpSecret } = params;
  let accessToken;

  const execute = async () => {
    await updateToken(fetchLogin(credentials));
    const { requisitions } = await updateToken(fetchRequisitions({ accessToken }));
    const { processingOrders } = await updateToken(fetchCart({ accessToken }));

    if (processingOrders > 0) return;
    const possibleOnes = requisitions.filter(simpleFilter);
    const sortedRequisitions = sortRequisitions(possibleOnes);
    await addToCart(sortedRequisitions);

    if (!sortedRequisitions.length) return;
    const otp = totp(otpSecret);
    await authorizeCart({ otp, accessToken });
  };

  const updateToken = async (request) => {
    const data = await request;
    accessToken = data.accessToken;
    return data;
  };

  const simpleFilter = ({
    term,
    purpose,
    alreadyLent,
    creditScore,
    interestRate,
    missingAmount,
  }) => {
    if (alreadyLent) return false;
    if (!missingAmount || missingAmount < LEND_AMOUNT) return false;
    if (interestRate < MIN_INTEREST_RATE) return false;
    if (AVOID_PURPOSES.includes(purpose)) return false;
    if (creditScore < MIN_CREDIT_SCORE) return false;
    if (TERM_RANGE.min && term < TERM_RANGE.min) return false;
    if (TERM_RANGE.max && term > TERM_RANGE.max) return false;
    return true;
  };

  const sortRequisitions = (requisitions) => {
    return requisitions.sort((a, b) => a.interestRate < b.interestRate);
  };

  const addToCart = (requisitions) => {
    return requisitions.reduce(async (waitForLast, requisition) => {
      await waitForLast;
      return updateToken(addRequisitionToCart({
        accessToken,
        amount: LEND_AMOUNT,
        requisitionId: requisition.id,
      }));
    }, Promise.resolve());
  };

  return execute();
};

module.exports = performLends;
