const execute = require('./execute');

exports.handler = (event, context, callback) => {
  return execute()
    .then(() => callback(null, 'SUCCESS'))
    .catch(callback);
};
