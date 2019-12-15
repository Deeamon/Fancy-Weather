class TranslateProvider {
  constructor() {
    this._TRANSLATER_API_TOKEN = 'trnsl.1.1.20191213T213915Z.6753390bbf8109f7.7a7b4b6c8515149203b1d671c6fa44474bdebce2';
  }

  async getTranslaterResponce(text, lang = 'en') {
    this._URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this._TRANSLATER_API_TOKEN}&text=${text}&lang=${lang}`;
    return (await fetch(this._URL)).json();
  }
}

module.exports = {
  TranslateProvider,
};
