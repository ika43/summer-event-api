/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const should = chai.should();
const { expect } = chai;

const queryString = {
  from: 'random',
  to: 'random',
};

chai.use(chaiHttp);

describe('/GET directions without query string', () => {
  it('it should return 400 without required parameters', async () => {
    const res = await chai.request(app).get('/directions');
    res.should.have.status(400);
  });
});

describe('/GET directions with random query string', () => {
  it('it should return empty connections for random locations', async () => {
    const res = await chai.request(app).get('/directions').query(queryString);
    res.should.have.status(200);
    res.body.should.have.own.property('connections');
    res.body.connections.should.be.an('array');
    res.body.connections.should.be.empty;
  });
});

describe('/GET directions with LIMIT query string', () => {
  it('it should return two connections for requested locations', async () => {
    queryString.from = 'Basel';
    queryString.to = 'Bern';
    queryString.limit = 2;
    const res = await chai.request(app).get('/directions').query(queryString);
    res.should.have.status(200);
    res.body.should.have.own.property('connections');
    res.body.connections.should.be.an('array');
    res.body.connections.should.have.lengthOf(queryString.limit);
  });
});

describe('/GET directions for requested locations', () => {
  it('it should return four connections for requested locations', async () => {
    delete queryString.limit;
    const res = await chai.request(app).get('/directions').query(queryString);
    res.should.have.status(200);
    res.body.should.have.own.property('connections');
    res.body.connections.should.be.an('array');
    res.body.connections.should.have.lengthOf(4);
    res.body.connections[0].should.have.own.property('duration');
    res.body.connections[0].should.have.own.property('transfers');
    res.body.connections[0].should.have.own.property('sections');
  });
});
