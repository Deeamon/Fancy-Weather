const { DetailWeather } = require('./detailWeather');
const { Forecast } = require('./forecast');

class Weather {
  static parse(response) {
    return new Weather(DetailWeather.parse(response), Forecast.parse(response));
  }

  get detailWeather() {
    return this._detailWeather;
  }

  get forecast() {
    return this._forecast;
  }

  constructor(
    detailWeather,
    forecast,
  ) {
    this._detailWeather = detailWeather;
    this._forecast = forecast;
  }
}

module.exports = {
  Weather,
};
