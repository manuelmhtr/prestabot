const { getAccessToken } = require('../../parsers');

const parseRequisition = (data) => {
  const fundedAmount = parseFloat(data.funded_amount);
  return {
    fundedAmount,
    id: data.id,
    alreadyLent: fundedAmount > 0,
    qualification: data.qualification,
    interestRate: parseFloat(data.rate),
    purpose: data.purpose.toUpperCase(),
    term: parseInt(data.term, 10),
    amount: parseFloat(data.approved_amount),
    missingAmount: parseFloat(data.missing_amount),
    creditScore: parseInt(data.credit_score, 10),
  };
};

module.exports = (response) => {
  const { headers, data } = response;

  return {
    accessToken: getAccessToken(headers),
    requisitions: (data.requisitions || []).map(parseRequisition),
  }
};
