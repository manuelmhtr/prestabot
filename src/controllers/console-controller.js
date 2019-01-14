const {performLends} = require('../use-cases');
const {getCredentials} = require('../config');

function execute() {
  const credentials = getCredentials();
  return performLends({credentials});
}

return execute()
  .then(() => console.log('SUCCESS'))
  .catch(error => console.log('ERROR', error));
