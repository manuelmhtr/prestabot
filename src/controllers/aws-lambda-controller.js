const execute = require('./execute');

exports.handler = (event, context, callback) => {
  return execute()
    .then((results) => callback(null, { success: true, ...results }))
    .catch(callback);
};
