const { ForecastItem } = require('./forecastItem');

class Forecast {
  static parse(response) {
    return new Forecast(
      response.daily.data.map((d) => ForecastItem.parse(d)),
    );
  }

  get forecastItems() {
    return this._forecastItems;
  }

  constructor(forecastItems) {
    this._forecastItems = forecastItems;
  }
}

module.exports = {
  Forecast,
};
