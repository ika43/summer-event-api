/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

const expressionTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const regexTime = new RegExp(expressionTime);
const expressionPlace = /[A-Za-z!,@#$%&*\s]+\p{L}/;
const regexPlace = new RegExp(expressionPlace, 'u');
const messages = require('../../const/messages');

const querySchema = Joi.object({
  from: Joi.string().min(2).required().pattern(regexPlace).messages({
    'string.min': messages.FROM_MIN_LENGTH_MESSAGE,
    'any.required': messages.FROM_REQUIRED_MESSAGE,
    'string.pattern.base': messages.FROM_PATTERN_MESSAGE,
  }),
  to: Joi.string().min(2).required().regex(regexPlace).messages({
    'string.min': messages.TO_MIN_LENGTH_MESSAGE,
    'any.required': messages.TO_REQUIRED_MESSAGE,
    'string.pattern.base': messages.TO_PATTERN_MESSAGE,
  }),
  limit: Joi.number().min(1).max(16).messages({
    'number.min': messages.LIMIT_MESSAGE,
    'number.max': messages.LIMIT_MESSAGE,
  }),
  time: Joi.string().optional().regex(regexTime).messages({
    'string.pattern.base': messages.TIME_MESSAGE,
  }),
});

module.exports = querySchema;
