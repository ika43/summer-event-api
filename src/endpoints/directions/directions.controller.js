const createError = require('http-errors');
const { getDirections } = require('./directions.service');

const getTransport = async (req, res, next) => {
  try {
    const { data } = await getDirections(req.query, process.env.TRANSPORT_API_URL);
    return res.json(data);
  } catch (err) {
    return next(createError(500));
  }
};

module.exports = {
  getTransport,
};
