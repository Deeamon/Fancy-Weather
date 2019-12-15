class WeatherProvider {
  constructor() {
    this._WEATHER_API_TOKEN = '4992e5d3e65eb59ceb1fddfebdeb9e20';
  }

  async getWeatherParams(locationCoordinates, lang = 'en') {
    this._URL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this._WEATHER_API_TOKEN}/${locationCoordinates}?lang=${lang}&units=si`;
    return (await fetch(this._URL)).json();
  }
}

module.exports = {
  WeatherProvider,
};
