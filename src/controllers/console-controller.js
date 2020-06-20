const execute = require('./execute');

return execute()
  .then(() => console.log('SUCCESS'))
  .catch(error => console.log('ERROR', error));
