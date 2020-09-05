const chai = require('chai');
const querySchema = require('../src/endpoints/directions/directions.validator');
const messages = require('../src/const/messages');

const { expect } = chai;

const mockSchema = {
  from: 'Tamedia AG, Werdstrasse 21, 8004 Zürich, Switzerland',
  to: 'Biel/Bienne BSG',
  limit: 1,
  time: '17:15',
};

describe('Joi validation schema', () => {
  it('should return success message with valid queryParams', () => {
    const result = querySchema.validate(mockSchema);
    expect(result.value).to.eql(mockSchema);
  });
  it('should return an error if LIMIT is lower than 1', () => {
    mockSchema.limit = 0;
    const result = querySchema.validate(mockSchema);
    expect(result.error.details[0].message).to.eql(messages.LIMIT_MESSAGE);
  });
  it('should return an error if LIMIT is greater than 16', () => {
    mockSchema.limit = 17;
    const result = querySchema.validate(mockSchema);
    expect(result.error.details[0].message).to.eql(messages.LIMIT_MESSAGE);
  });
  it('should return an error if TIME format not hh:mm', () => {
    delete mockSchema.limit;
    mockSchema.time = 'wrongTimeFormat';
    const result = querySchema.validate(mockSchema);
    expect(result.error.details[0].message).to.eql(messages.TIME_MESSAGE);
  });
  it('should return an error if no TO is provided', () => {
    delete mockSchema.to;
    const result = querySchema.validate(mockSchema);
    expect(result.error.details[0].message).to.eql(messages.TO_REQUIRED_MESSAGE);
  });
  it('should return an error if no FROM is provided', () => {
    delete mockSchema.from;
    const result = querySchema.validate(mockSchema);
    expect(result.error.details[0].message).to.eql(messages.FROM_REQUIRED_MESSAGE);
  });
});
