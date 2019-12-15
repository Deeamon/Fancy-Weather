class MapProvider {
  init(latitude, longitude) {
    return new ymaps.Map('map', {
      center: [latitude, longitude],
      zoom: 9,
    });
  }
}

module.exports = {
  MapProvider,
};
