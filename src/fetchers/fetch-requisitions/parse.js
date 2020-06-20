const { getAccessToken } = require('../../parsers');

const parseRequisition = (data) => {
  const fundedAmount = parseFloat(data.funded_amount);
  return {
    fundedAmount,
    alreadyLent: fundedAmount > 0,
    id: data.id,
    zellAppId: data.zell_app_id,
    qualification: data.qualification,
    interestRate: parseFloat(data.rate),
    purpose: data.destination.toUpperCase(),
    term: parseInt(data.term, 10),
    amount: parseFloat(data.approved_amount),
    missingAmount: parseFloat(data?.loan_detail?.missing_amount),
    daysToEnd: parseInt(data?.loan_detail?.days_to_end, 10),
    hidden: data.hidden,
    creditReport: {
      score: parseInt(data?.credit_report?.score, 10),
      age: parseInt(data?.credit_report?.history_antiquity, 10),
    },
  };
};

module.exports = (response) => {
  const { headers, data } = response;

  return {
    accessToken: getAccessToken(headers),
    requisitions: (data.requisitions || []).map(parseRequisition),
  }
};
