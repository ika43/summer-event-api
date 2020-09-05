const client = require('prom-client');
const ResponseTime = require('response-time');
const log = require('../logger');

/**
 * A Prometheus counter that counts the invocations of the different HTTP verbs
 * e.g. a GET and a POST call will be counted as 2 different calls
 */
const numOfRequests = new client.Counter({
  name: 'numOfRequests',
  help: 'Number of requests made',
  labelNames: ['method'],
});

/**
 * A Prometheus counter that counts the invocations with different paths
 * e.g. /foo and /bar will be counted as 2 different paths
 */
const pathsTaken = new client.Counter({
  name: 'pathsTaken',
  help: 'Paths taken in the app',
  labelNames: ['path'],
});

/**
 * A Prometheus summary to record the HTTP method, path, response code and response time
 */
const responses = new client.Summary({
  name: 'responses',
  help: 'Response time in millis',
  labelNames: ['method', 'path', 'status'],
});

exports.startCollection = () => {
  log.info('Starting the collection of metrics, the metrics are available on /metrics');
  // eslint-disable-next-line global-require
  require('prom-client').collectDefaultMetrics();
};

/**
 * This function increments the counters that are executed on the request side of an invocation
 * Currently it increments the counters for numOfPaths and pathsTaken
 */
exports.requestCounters = (req, res, next) => {
  if (req.path !== '/metrics') {
    numOfRequests.inc({ method: req.method });
    pathsTaken.inc({ path: req.path });
  }
  next();
};

/**
 * This function increments the counters that are executed on the response side of an invocation
 * Currently it updates the responses summary
 */

exports.responseCounters = ResponseTime((req, res, time) => {
  if (req.url !== '/metrics') {
    responses.labels(req.method, req.url, res.statusCode.toString()).observe(time);
  }
});

/**
 * In order to have Prometheus get the data from this app a specific URL is registered
 */
exports.injectMetricsRoute = (app) => {
  app.get('/metrics', (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.send(client.register.metrics());
  });
};
