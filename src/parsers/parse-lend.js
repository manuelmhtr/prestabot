const SUCCESS_STATUS = 200;

function parseLend(response) {
  const {status} = response;
  const success = status === SUCCESS_STATUS;
  return { success };
}

module.exports = parseLend;
