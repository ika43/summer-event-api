const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

const should = chai.should();

chai.use(chaiHttp);

describe('The Application', () => {
  it('should have an index route', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
  });
  it('should have a metrics route', async () => {
    const res = await chai.request(app).get('/metrics');
    res.should.have.status(200);
  });
  it('should return 404 for random-url', async () => {
    const res = await chai.request(app).get('/random-url');
    res.should.have.status(404);
  });
});
