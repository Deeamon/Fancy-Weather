class Image {
  static parse(response) {
    return new Image(
      response.links.download,
    );
  }

  get linkToImage() {
    return this._linkToImage;
  }

  constructor(
    linkToImage,
  ) {
    this._linkToImage = linkToImage;
  }
}

module.exports = {
  Image,
};
