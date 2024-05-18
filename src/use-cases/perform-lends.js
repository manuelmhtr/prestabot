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
  getTermRange,
  getMinLendAmount,
  getMaxLendAmount,
} = require('../config');

const MIN_INTEREST_RATE = getMinInterestRate();
const MIN_CREDIT_SCORE = getMinCreditScore();
const TERM_RANGE = getTermRange();
const AVOID_DESTINATIONS = ['NEGOCIO', 'OTROS'];

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
    const orders = await addToCart(sortedRequisitions);

    if (sortedRequisitions.length > 0) {
      const otp = totp(otpSecret);
      await authorizeCart({ otp, accessToken });
    }

    return {
      orders,
    };
  };

  const updateToken = async (request) => {
    const data = await request;
    accessToken = data.accessToken;
    return data;
  };

  const simpleFilter = ({
    term,
    destination,
    alreadyLent,
    creditScore,
    interestRate,
    missingAmount,
  }) => {
    if (alreadyLent) return false;
    if (!missingAmount) return false;
    if (interestRate < MIN_INTEREST_RATE) return false;
    if (AVOID_DESTINATIONS.includes(destination)) return false;
    if (creditScore < MIN_CREDIT_SCORE) return false;
    if (TERM_RANGE.min && term < TERM_RANGE.min) return false;
    if (TERM_RANGE.max && term > TERM_RANGE.max) return false;
    return true;
  };

  const sortRequisitions = (requisitions) => {
    return requisitions.sort((a, b) => a.interestRate < b.interestRate);
  };

  const calculateLendAmount = ({
    previousLoans,
    isWarranted,
    missingAmount,
  }) => {
    const isGreatDeal = previousLoans > 1 || isWarranted;
    const base = isGreatDeal ? getMaxLendAmount() : getMinLendAmount();
    return Math.min(missingAmount || 0, base);
  };

  const addToCart = (requisitions) => {
    return requisitions.reduce(async (waitForLast, requisition) => {
      const prev = await waitForLast;
      const amount = calculateLendAmount(requisition);
      const options = { amount, requisitionId: requisition.id };
      await updateToken(addRequisitionToCart({ ...options, accessToken }));
      return [...prev, options];
    }, Promise.resolve([]));
  };

  return execute();
};

module.exports = performLends;
