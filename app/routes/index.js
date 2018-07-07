const restoreId = require('./restore_id');
const login = require('./login');
module.exports = function(app, db) {
  restoreId(app, db);
  login(app, db);
  // Other route groups could go here, in the future
};