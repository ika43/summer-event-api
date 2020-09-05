const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./lib/swagger');
const directionRoutes = require('./endpoints/directions/directions.route');
const promConfig = require('./lib/prometheus');

// import env variables
dotenv.config();

const app = express();
app.use(cors());

// Prometheus setup
app.use(promConfig.requestCounters);
app.use(promConfig.responseCounters);
promConfig.injectMetricsRoute(app);
promConfig.startCollection();

// Swagger setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
app.get('/', (req, res) => res.send('SUMMER EVENT API v0.1 IS UP'));
app.use('/directions', directionRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = process.env.NODE_ENV === 'dev' ? err : {};
  res.status(status);
  return res.send(err);
});

module.exports = app;
