const router = require('express').Router();
const { getTransport } = require('./directions.controller');
const validationMiddleware = require('./directions.middleware');

router.get('/', validationMiddleware, getTransport);

module.exports = router;
