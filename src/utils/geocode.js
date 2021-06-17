const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFpZmFyIiwiYSI6ImNrcGdrczk1eDJjbDMycmxsYWp6cm5xa24ifQ.YmCB7qc7hoeuYIR40A8fSA&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (!body.features || body.features.length === 0) {
      callback("Unable to find location! Try another search.", undefined);
    } else {
      const {
        center: [longitude, latitude],
        place_name: location,
      } = body.features[0];

      callback(undefined, {
        latitude,
        longitude,
        location,
      });
    }
  });
};

module.exports = geocode;
