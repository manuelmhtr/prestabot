const { getAccessToken } = require('../../parsers');

const parseRequisition = (data) => {
  const fundedAmount = parseFloat(data.funded_amount);
  const loadDetail = data.loan_detail || {};
  const creditReport = data.credit_report || {};
  return {
    fundedAmount,
    id: data.id,
    alreadyLent: fundedAmount > 0,
    qualification: data.qualification,
    interestRate: parseFloat(data.rate),
    destination: String(data.destination).toUpperCase(),
    term: parseInt(data.term, 10),
    amount: parseFloat(data.approved_amount),
    missingAmount: parseFloat(loadDetail.missing_amount),
    creditScore: parseInt(creditReport.score, 10),
    previousLoans: parseInt(data.number_of_credits, 10),
    isWarranted: data.zapopan,
  };
};

module.exports = (response) => {
  const { headers, data } = response;

  return {
    accessToken: getAccessToken(headers),
    requisitions: (data.requisitions || []).map(parseRequisition),
  }
};
