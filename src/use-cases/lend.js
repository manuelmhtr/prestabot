const {fetchLend} = require('../fetchers');
const {parseLend} = require('../parsers');

async function getLend(params) {
  const response = await fetchLend(params);
  return parseLend(response);
}

module.exports = getLend;
