const {performLends} = require('../use-cases');
const {getCredentials} = require('../config');

function execute() {
  const credentials = getCredentials();
  return performLends({credentials});
}

exports.handler = (event, context, callback) => {
  return execute()
    .then(() => callback(null, 'SUCCESS'))
    .catch(callback);
};
