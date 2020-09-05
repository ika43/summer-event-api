const chai = require('chai');
const { getDirections } = require('../src/endpoints/directions/directions.service');
require('dotenv').config();

const { expect } = chai;

const mockSchema = {
  from: 'Tamedia AG, Werdstrasse 21, 8004 Zürich, Switzerland',
  to: 'Biel/Bienne BSG',
};

describe('Direction service', () => {
  it('should return data from public transport API', async () => {
    const result = await getDirections(mockSchema, process.env.TRANSPORT_API_URL);
    expect(result.data).to.haveOwnProperty('connections');
  });
});
