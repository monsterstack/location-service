'use-strict';
const controller = require('../controllers/index.controller');

module.exports = (app) => {
  app.get('/', controller.index(app));
};
