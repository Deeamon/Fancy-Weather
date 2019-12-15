/* eslint-disable no-undef */
const options = require('./options');
const languages = require('./languages');

describe('test params', () => {
  it('should return list of languages params', () => {
    expect(languages.getLanguageState()).toBeDefined();
  });

  it('should return list of options params', () => {
    expect(options.getOptionState()).toBeDefined();
  });
});

describe('type language and option params', () => {
  let languageRes;
  let optionRes;

  beforeEach(() => {
    languageRes = languages.getLanguageState();
    optionRes = options.getOptionState();
  });

  it('should return type of languages', () => {
    expect(languageRes).toBeInstanceOf(Array);
    expect(languageRes).toEqual(expect.any(Array));
  });

  it('should return type of object', () => {
    expect(optionRes).toBeInstanceOf(Array);
    expect(optionRes).toEqual(expect.any(Array));
  });
});

describe('count languages', () => {
  let languageRes;

  beforeEach(() => {
    languageRes = languages.getLanguageState();
  });

  it('more than two langeages', () => {
    expect(languageRes.length).toBeGreaterThan(2);
  });
});

describe('abailable languages', () => {
  let languageRes;

  beforeEach(() => {
    languageRes = languages.getLanguageState();
  });

  it('includes english language', () => {
    expect(languageRes).toContain('en');
  });

  it('includes russian language', () => {
    expect(languageRes.includes('ru')).toBeTruthy();
  });

  it('includes belarussian language', () => {
    expect(languageRes.includes('be')).toBeTruthy();
  });

  it('includes italian language', () => {
    expect(languageRes[4]).toEqual('it');
  });

  it('includes german language', () => {
    expect(languageRes[3]).toEqual('de');
  });
});
