const AVAILABLE_LANGUAGES = [
  'en',
  'ru',
  'be',
  'de',
  'it',
];

function getLanguageState() {
  return AVAILABLE_LANGUAGES.map((el) => el);
}

module.exports = {
  getLanguageState,
  AVAILABLE_LANGUAGES,
};
