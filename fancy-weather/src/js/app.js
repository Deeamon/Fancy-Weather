const { Render } = require('./render');
const { Image } = require('./image');
const { LocationProvider } = require('./locationProvider');
const { WeatherProvider } = require('./weatherProvider');
const { ImageProvider } = require('./imageProvider');
const { MapProvider } = require('./mapProvider');
const { MapUpdater } = require('./mapUpdater');
const { DateAndTimeProvider } = require('./dateAndTimeProvider');
const { TranslateProvider } = require('./translateProvider');
const { FanсyWeather } = require('./fanсyWeather');
const { OPTIONS } = require('./options');

class App {
  constructor() {
    this._render = new Render();
    this._locationProvider = new LocationProvider();
    this._weatherProvider = new WeatherProvider();
    this._imageProvider = new ImageProvider();
    this._mapProvider = new MapProvider();
    this._mapUpdater = new MapUpdater();
    this._dateAndTimeProvider = new DateAndTimeProvider();
    this._translateProvider = new TranslateProvider();
  }

  async execute() {
    const renderInit = this._render.renderInit();
    let langValue = 'en';
    const locationResponse = await this._locationProvider.getLocationParams();
    const { loc, city } = locationResponse;
    let locArr = loc.split(',');
    const imageResponse = await this._imageProvider.getImage(city);
    let detailWeatherResponse = await this._weatherProvider.getWeatherParams(loc);
    let temp = await this._dateAndTimeProvider.getDataAndTime(+locArr[0], +locArr[1]);
    let currentTimezoneTime = new Date(temp.formatted).getTime();

    let fancyWeather = FanсyWeather.parse(
      locationResponse,
      detailWeatherResponse,
      imageResponse,
    );
    setInterval(() => {
      currentTimezoneTime += 1000;
      document.querySelector('.main__data-and-time').innerText = new Date(currentTimezoneTime).toLocaleString(`${langValue}`, OPTIONS).toUpperCase();
    }, 1000);

    const myMap = this._mapProvider.init(+locArr[0], +locArr[1]);

    this._render.render(fancyWeather, langValue);

    renderInit.buttonSearchRef.addEventListener('click', async () => {
      const inputValue = renderInit.inputFieldRef.value;
      this._mapUpdater.validateInputValue(inputValue);
      const getInputLocationRes = await this._mapUpdater.changeCity(inputValue, myMap);
      locArr = getInputLocationRes.loc.split(',');
      temp = await this._dateAndTimeProvider.getDataAndTime(+locArr[0], +locArr[1]);
      currentTimezoneTime = new Date(temp.formatted).getTime();

      detailWeatherResponse = await this._weatherProvider.getWeatherParams(getInputLocationRes.loc);

      const tempImageResponse = await this._imageProvider.getImage(inputValue);
      this.tempImgLink = Image.parse(tempImageResponse);
      fancyWeather.image = this.tempImgLink;

      fancyWeather = FanсyWeather.parse(
        getInputLocationRes,
        detailWeatherResponse,
        tempImageResponse,
      );
      fancyWeather.detailWeather.time = currentTimezoneTime * 1000;
      const cityTranslate = await this._translateProvider.getTranslaterResponce(
        getInputLocationRes.city,
        langValue,
      );
      fancyWeather.location.city = cityTranslate.text;

      const countryTranslate = await this._translateProvider.getTranslaterResponce(
        getInputLocationRes.country,
        langValue,
      );
      fancyWeather.location.country = countryTranslate.text;

      this._render.render(fancyWeather, langValue);
    });

    document.body.addEventListener('keydown', async (e) => {
      if (e.keyCode !== 13) return;

      const inputValue = renderInit.inputFieldRef.value;
      this._mapUpdater.validateInputValue(inputValue);
      const getInputLocationRes = await this._mapUpdater.changeCity(inputValue, myMap);
      locArr = getInputLocationRes.loc.split(',');
      temp = await this._dateAndTimeProvider.getDataAndTime(+locArr[0], +locArr[1]);
      currentTimezoneTime = new Date(temp.formatted).getTime();

      detailWeatherResponse = await this._weatherProvider.getWeatherParams(getInputLocationRes.loc);

      const tempImageResponse = await this._imageProvider.getImage(inputValue);
      this.tempImgLink = Image.parse(tempImageResponse);
      fancyWeather.image = this.tempImgLink;

      fancyWeather = FanсyWeather.parse(
        getInputLocationRes,
        detailWeatherResponse,
        tempImageResponse,
      );

      const responceCity = await this._translateProvider.getTranslaterResponce(
        getInputLocationRes.city,
        langValue,
      );

      fancyWeather.location.city = responceCity.text;

      const responceCountry = await this._translateProvider.getTranslaterResponce(
        getInputLocationRes.country,
        langValue,
      );

      fancyWeather.location.country = responceCountry.text;

      fancyWeather.detailWeather.time = currentTimezoneTime * 1000;
      this._render.render(fancyWeather, langValue);
    });

    renderInit.languageSwitcherRef.addEventListener('change', async (event) => {
      const inputValue = renderInit.inputFieldRef.value || 'Minsk';
      this._mapUpdater.validateInputValue(inputValue);
      const getInputLocationRes = await this._mapUpdater.changeCity(inputValue, myMap);

      console.log('TCL: App -> execute -> getInputLocationRes', getInputLocationRes.city);

      langValue = event.srcElement.value.toLowerCase();

      detailWeatherResponse = await this._weatherProvider.getWeatherParams(locArr.join(','), langValue);

      const tempImageResponse = await this._imageProvider.getImage(inputValue);
      this.tempImgLink = Image.parse(tempImageResponse);
      fancyWeather.image = this.tempImgLink;

      fancyWeather = FanсyWeather.parse(
        getInputLocationRes,
        detailWeatherResponse,
        tempImageResponse,
      );

      const cityTranslate = await this._translateProvider.getTranslaterResponce(
        getInputLocationRes.city,
        langValue,
      );
      fancyWeather.location.city = cityTranslate.text;
      const countryTranslate = await this._translateProvider.getTranslaterResponce(
        getInputLocationRes.country,
        langValue,
      );
      fancyWeather.location.country = countryTranslate.text;

      this._render.renderLocation(fancyWeather.location);
      this._render.renderWeather(fancyWeather.detailWeather);
      this._render.renderForecast(fancyWeather.forecast, langValue);
    });

    renderInit.buttonRefreshBgkRef.addEventListener('click', async () => {
      const tempImageResponse = await this._imageProvider.getImage(
        renderInit.inputFieldRef.value || city,
      );
      this.tempImgLink = Image.parse(tempImageResponse);
      fancyWeather.image = this.tempImgLink;
      this._render.renderUpdate(fancyWeather, langValue);
    });

    renderInit.btnFahrenheitRef.addEventListener('click', () => {
      document.querySelectorAll('.degreesSwitcher').forEach((element) => {
        const fahrenheitValue = Math.round(element.innerText.slice(0, -1) * 1.8 + 32);
        element.innerText = `${fahrenheitValue}°`;
        renderInit.btnFahrenheitRef.style.display = 'none';
        renderInit.btnCelsiusRef.style.display = 'block';
      });
    });

    renderInit.btnCelsiusRef.addEventListener('click', () => {
      document.querySelectorAll('.degreesSwitcher').forEach((element) => {
        const celsiusValue = Math.round((element.innerText.slice(0, -1) - 32) * (5 / 9));
        element.innerText = `${celsiusValue}°`;
        renderInit.btnCelsiusRef.style.display = 'none';
        renderInit.btnFahrenheitRef.style.display = 'block';
      });
    });
  }
}

module.exports = {
  App,
};
