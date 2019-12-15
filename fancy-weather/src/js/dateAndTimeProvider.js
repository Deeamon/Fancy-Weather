class DateAndTimeProvider {
  constructor() {
    this._TIMEZONEDB_API_TOKEN = 'OUQPVA35BH70';
  }

  async getDataAndTime(latitude, longitude) {
    this._URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${this._TIMEZONEDB_API_TOKEN}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
    return (await fetch(this._URL)).json();
  }
}

module.exports = {
  DateAndTimeProvider,
};
