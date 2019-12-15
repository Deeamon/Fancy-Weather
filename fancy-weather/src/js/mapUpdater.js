class MapUpdater {
  validateInputValue(value) {
    switch (value.length >= 2) {
      case (true):
        break;
      default:
        alert('Нет такого города');
    }
  }

  changeCity(searchInputVal, myMap) {
    return ymaps.geocode(`${searchInputVal}`, { results: 1 })
      .then((res) => {
        // Выбираем первый результат геокодирования.
        const firstGeoObject = res.geoObjects.get(0);
        // Координаты геообъекта.
        const coords = firstGeoObject.geometry.getCoordinates();
        firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        // Получаем строку с адресом и выводим в иконке геообъекта.
        firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
        // Добавляем первый найденный геообъект на карту.
        myMap.geoObjects.add(firstGeoObject);
        myMap.panTo([...coords], { flying: 1 });

        const loc = coords.join(',');
        const address = firstGeoObject.getAddressLine();
        const [country, city] = address.split(',');

        return {
          city,
          country,
          loc,
        };
      });
  }
}

module.exports = {
  MapUpdater,
};
