const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=984fa1c0cbbba2d7c2d08ff8f1a90bb0&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request.get({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location! Try another search.", undefined);
    } else {
      const {
        temperature,
        feelslike: feelsLike,
        weather_descriptions: [weatherDescription],
      } = body.current;

      callback(
        undefined,
        weatherDescription +
          ". It is currently " +
          temperature +
          " degrees out. It feels like " +
          feelsLike +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
