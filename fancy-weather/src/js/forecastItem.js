const { SimpleWeather } = require('./simpleWeather');

class ForecastItem {
  static parse(response) {
    return new ForecastItem(
      ForecastItem.parseDayOfWeek(response.time),
      SimpleWeather.parse(response),
    );
  }

  static parseDayOfWeek(unixTime) {
    return new Date(new Date(unixTime * 1000).toISOString().split('T')[0]);
  }

  get dayLabel() {
    return this._dayLabel;
  }

  get weather() {
    return this._weather;
  }

  constructor(
    dayLabel,
    weather,
  ) {
    this._dayLabel = dayLabel;
    this._weather = weather;
  }
}

module.exports = {
  ForecastItem,
};
