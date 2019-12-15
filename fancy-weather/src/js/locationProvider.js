class LocationProvider {
  constructor() {
    this._URL = 'https://ipinfo.io/json?token=b35fb2ad7ace66';
  }

  async getLocationParams() {
    return (await fetch(this._URL)).json();
  }
}

module.exports = {
  LocationProvider,
};
