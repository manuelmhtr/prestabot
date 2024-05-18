require('dotenv').config();
const execute = require('./execute');

return execute()
  .then((results) => console.log({ success: true, ...results }))
  .catch(error => console.log('ERROR', error));
