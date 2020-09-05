const createError = require('http-errors');
const querySchema = require('./directions.validator');

const validationMiddleware = (req, res, next) => {
  const result = querySchema.validate(req.query);
  if (result.error) next(createError(400, result.error.details[0].message));
  else next();
};

module.exports = validationMiddleware;
