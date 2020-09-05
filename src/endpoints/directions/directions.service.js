const axios = require('axios');
const qs = require('qs');

// limit the response data with the fields parameter
const createResponseFields = () => {
  const arrayFields = [
    'connections/sections/journey',
    'connections/duration',
    'connections/transfers',
    'connections/sections/walk',
    'connections/sections/departure/departure',
    'connections/sections/departure/station/name',
    'connections/sections/arrival/arrival',
    'connections/sections/arrival/station/name',
    'connections/sections/journey/name',
    'connections/sections/journey/category',
    'connections/sections/journey/passList/station/name',
    'connections/sections/journey/passList/arrival',
  ];
  const responseFields = qs.stringify({ 'fields[]': arrayFields }, { indices: false });
  return responseFields;
};

const getDirections = (params, url) => {
  // set defaults parameter if no provided
  params.limit = params.limit || 4;
  params.time = params.time || '17:15';
  params.isArrivalTime = 1;
  return axios.get(`${url}?${createResponseFields()}`, { params });
};

module.exports = {
  getDirections,
};
