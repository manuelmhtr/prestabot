const {fetchRequisitions} = require('../fetchers');
const {parseRequisitions} = require('../parsers');

async function getRequisitions(sessionToken) {
  const response = await fetchRequisitions(sessionToken);
  return parseRequisitions(response);
}

module.exports = getRequisitions;
