const {fetchRequisitionDetails} = require('../fetchers');
const {parseRequisitionDetails} = require('../parsers');

async function getRequisitionDetails(sessionToken, id) {
  const response = await fetchRequisitionDetails(sessionToken, id);
  return parseRequisitionDetails(response, id);
}

module.exports = getRequisitionDetails;
