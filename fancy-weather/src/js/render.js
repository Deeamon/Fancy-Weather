const { ElementForListener } = require('./elementForListener');
const { DetailWeather } = require('./detailWeather');
const { AVAILABLE_LANGUAGES } = require('./languages');
const { OPTIONS } = require('./options');

class Render {
  renderInit() {
    const wrapper = this._renderWrapperInit();
    document.body.prepend(wrapper);

    const header = document.createElement('header');
    header.className = 'header';
    wrapper.append(header);

    const toolsBarRef = this._renderToolsBar(header); // .header__tools
    const buttonRefreshBgkRef = this._refreshBgk(toolsBarRef);
    const languageSwitcherRef = this._renderLanguageSwitcher(toolsBarRef);
    const { btnCelsiusRef, btnFahrenheitRef } = this._renderDegreeSwitcher(toolsBarRef);
    const { buttonSearchRef, inputFieldRef } = this._renderSearchForm(header);

    const main = document.createElement('main');
    main.className = 'main';

    const mainInfo = document.createElement('div');
    mainInfo.className = 'main__info';

    this._renderLocationInit(main);
    this._renderDataAndTimeInit(main);
    this._renderWeatherInit(mainInfo);
    this._renderMapInfoInit(mainInfo);
    main.append(mainInfo);

    this._renderForecastInit(main);

    wrapper.append(main);

    return new ElementForListener(
      buttonSearchRef,
      inputFieldRef,
      buttonRefreshBgkRef,
      btnCelsiusRef,
      btnFahrenheitRef,
      languageSwitcherRef,
    );
  }

  render(fanсyWeather, lang) {
    this._renderWrapper(fanсyWeather.image);
    this.renderLocation(fanсyWeather.location);
    this._renderDataAndTime(fanсyWeather.detailWeather, lang);
    this.renderWeather(fanсyWeather.detailWeather);
    this._renderCoord(fanсyWeather.location);
    this.renderForecast(fanсyWeather.forecast, lang);
  }

  _renderWrapperInit() {
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    return wrapper;
  }

  _renderLocationInit(main) {
    const locationRef = document.createElement('div');
    locationRef.className = 'main__location';

    const city = document.createElement('span');
    city.className = 'location__city';

    const country = document.createElement('span');
    country.className = 'location__country';

    locationRef.append(city);
    locationRef.append(country);
    main.append(locationRef);
  }

  _renderDataAndTimeInit(
    main,
  ) {
    const timeRef = document.createElement('div');
    timeRef.className = 'main__data-and-time';

    main.append(timeRef);
  }

  _renderWeatherInit(
    mainInfo,
  ) {
    const forecastDataRef = document.createElement('div');
    forecastDataRef.className = 'info__weather';

    const temperatureRef = document.createElement('div');
    temperatureRef.className = 'weather__temp degreesSwitcher';

    const addsInfoRef = document.createElement('div');
    addsInfoRef.className = 'weather__adds-info';

    const dataCloudImgRef = document.createElement('img');
    dataCloudImgRef.className = 'adds-info__clouds';

    const valueWetherRef = document.createElement('div');
    valueWetherRef.className = 'adds-info__value';

    const skyStateRef = document.createElement('div');
    skyStateRef.className = 'value__item sky';

    const temprFeelBoxRef = document.createElement('div');
    temprFeelBoxRef.className = 'value__item';

    const temprFeelRef = document.createElement('div');
    temprFeelRef.className = 'tempr degreesSwitcher';

    const temprFeelIconRef = document.createElement('span');
    temprFeelIconRef.className = 'humidity-feeling';

    const windSpeedRef = document.createElement('div');
    windSpeedRef.className = 'value__item wind';


    const humidityValRef = document.createElement('div');
    humidityValRef.className = 'value__item humid';

    valueWetherRef.append(skyStateRef);
    valueWetherRef.append(temprFeelBoxRef);
    temprFeelBoxRef.append(temprFeelIconRef);
    temprFeelBoxRef.append(temprFeelRef);
    valueWetherRef.append(windSpeedRef);
    valueWetherRef.append(humidityValRef);

    addsInfoRef.append(dataCloudImgRef);
    addsInfoRef.append(valueWetherRef);

    forecastDataRef.append(temperatureRef);
    forecastDataRef.append(addsInfoRef);

    mainInfo.append(forecastDataRef);
  }

  _renderMapInfoInit(
    mainInfo,
  ) {
    const mapInfoRef = document.createElement('div');
    mapInfoRef.className = 'info__location';

    this._renderMap(mapInfoRef);
    this._renderCoordInit(mapInfoRef);

    mainInfo.append(mapInfoRef);
  }

  _renderMap(mapInfoRef) {
    const map = document.createElement('div');
    map.className = 'location__map';
    map.id = 'map';

    mapInfoRef.append(map);
  }

  _renderCoordInit(mapInfoRef) {
    const coordRef = document.createElement('div');
    coordRef.className = 'location__coord';

    mapInfoRef.append(coordRef);
  }

  _renderForecastInit(
    main,
  ) {
    const forecastRef = document.createElement('div');
    forecastRef.className = 'main__forecast';

    for (let i = 2; i < 5; i += 1) {
      const itemRef = document.createElement('div');
      itemRef.className = 'forecast__item';

      const forecastItemRef = document.createElement('div');
      forecastItemRef.className = `item__day-label item__day-label--item${i}`;

      const dayInfoRef = document.createElement('div');
      dayInfoRef.className = 'item__day-info';

      const forecastDataCloudImgRef = document.createElement('img');
      forecastDataCloudImgRef.className = `day-info__cloud-state day-info__cloud-state--item${i}`;

      const forecastTemperatureRef = document.createElement('div');
      forecastTemperatureRef.className = `day-info__temp day-info__temp--item${i} degreesSwitcher`;

      dayInfoRef.append(forecastTemperatureRef);
      dayInfoRef.append(forecastDataCloudImgRef);

      itemRef.append(forecastItemRef);
      itemRef.append(dayInfoRef);

      forecastRef.append(itemRef);
    }
    main.append(forecastRef);
  }

  _renderWrapper(
    image,
  ) {
    document.querySelector('.wrapper').style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${image.linkToImage}')`;
    document.querySelector('.wrapper').style.backgroundPosition = 'center center';
    document.querySelector('.wrapper').style.backgroundSize = 'cover';
  }

  _renderToolsBar(header) {
    const toolsBar = document.createElement('div');
    toolsBar.className = 'header__tools';

    header.append(toolsBar);
    return toolsBar;
  }

  _refreshBgk(toolsBar) {
    const buttonRefreshBgk = document.createElement('button');
    buttonRefreshBgk.className = 'tools__refresh-button';
    buttonRefreshBgk.type = 'submit';
    buttonRefreshBgk.innerText = '⟳';

    toolsBar.append(buttonRefreshBgk);
    return buttonRefreshBgk;
  }

  _renderLanguageSwitcher(toolsBar) {
    const languageContainer = document.createElement('div');
    languageContainer.className = 'tools__lang-container';
    const languageBox = document.createElement('select');
    languageBox.className = 'lang-container__select-lang';

    AVAILABLE_LANGUAGES.forEach((elem) => {
      const option = document.createElement('option');
      option.className = 'select-lang__option';
      option.innerText = `${elem.toUpperCase()}`;
      languageBox.append(option);
    });

    languageContainer.append(languageBox);

    toolsBar.append(languageContainer);

    return languageBox;
  }

  _renderDegreeSwitcher(toolsBar) {
    const btnFahrenheitRef = document.createElement('button');
    btnFahrenheitRef.innerText = '℉';
    btnFahrenheitRef.className = 'tools__fahrenheit-btn';

    const btnCelsiusRef = document.createElement('button');
    btnCelsiusRef.className = 'tools__celsius-btn';
    btnCelsiusRef.innerText = '℃';
    btnCelsiusRef.style.display = 'none';

    toolsBar.append(btnFahrenheitRef);
    toolsBar.append(btnCelsiusRef);

    return {
      btnCelsiusRef,
      btnFahrenheitRef,
    };
  }

  _renderSearchForm(header) {
    const searchForm = document.createElement('div');
    searchForm.className = 'header__search-form';

    const buttonSearchRef = document.createElement('button');
    buttonSearchRef.className = 'search-form__button';
    buttonSearchRef.type = 'submit';
    buttonSearchRef.innerText = 'Search';

    const inputFieldRef = document.createElement('input');
    inputFieldRef.className = 'search-form__input';
    inputFieldRef.type = 'text';
    inputFieldRef.pattern = '[A-Za-zА-Яа-яЁё]';
    inputFieldRef.required = true;
    inputFieldRef.placeholder = 'Input the city';

    searchForm.append(inputFieldRef);
    searchForm.append(buttonSearchRef);
    header.append(searchForm);

    return {
      buttonSearchRef,
      inputFieldRef,
    };
  }

  renderLocation(
    location,
  ) {
    if (location.city) {
      document.querySelector('.location__city').innerText = `${location.city}, `;
    } else {
      document.querySelector('.location__city').innerText = '';
    }

    if (location.city === 'underfined') {
      document.querySelector('.location__city').innerText = '';
    }
    document.querySelector('.location__country').innerText = location.country;
  }

  _renderDataAndTime(
    weather,
    lang,
  ) {
    document.querySelector('.main__data-and-time').innerText = DetailWeather.parseCurrentTimezone(weather.time).toLocaleString(`${lang}`, OPTIONS).toUpperCase();
  }

  renderWeather(
    weather,
  ) {
    document.querySelector('.weather__temp').innerText = `${Math.round(weather.temperature)}°`;
    document.querySelector('.adds-info__clouds').src = `https://darksky.net/images/weather-icons/${weather._dataCloudImg}.png`;
    document.querySelector('.sky').innerText = `${weather.skyState}`;
    document.querySelector('.tempr').innerHTML = `${weather.temprFeel}°`;
    document.querySelector('.wind').innerHTML = `<span class="humidity-wind"></span> ${weather.windSpeed} m/s`;
    document.querySelector('.humid').innerHTML = `<span class="humidity-image"></span> ${weather.humidityVal}%`;
  }

  renderForecast(
    forecast,
    lang,
  ) {
    for (let i = 2; i < 5; i += 1) {
      document.querySelector(`.item__day-label--item${i}`).innerText = forecast.forecastItems[i].dayLabel.toLocaleString(
        `${lang}`,
        { weekday: 'long' },
      );
      document.querySelector(`.day-info__cloud-state--item${i}`).src = `https://darksky.net/images/weather-icons/${forecast.forecastItems[i].weather.dataCloudImg}.png`;
      document.querySelector(`.day-info__cloud-state--item${i}`).innerText = forecast.forecastItems[i].weather.dataCloudImg;
      document.querySelector(`.day-info__temp--item${i}`).innerText = `${Math.round(forecast.forecastItems[i].weather.temperature)}°`;
    }
  }

  _renderCoord(
    location,
  ) {
    const longitudeLatRef = location.coordinates.split(',');
    document.querySelector('.location__coord').innerHTML = `<span class="location-pins"></span>${(+longitudeLatRef[0]).toFixed(0)}°${Math.round(((+longitudeLatRef[0]) % 1) * 60)}' ,
    ${(+longitudeLatRef[1]).toFixed(0)}°${Math.round(((+longitudeLatRef[1]) % 1) * 60)}'`;
  }

  renderUpdate(fanсyWeather) {
    document.querySelector('.wrapper').style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${fanсyWeather.image.linkToImage}')`;
    document.querySelector('.wrapper').style.backgroundSize = 'cover';
    document.querySelector('.wrapper').style.backgroundPosition = 'center center';
  }
}

module.exports = {
  Render,
};
