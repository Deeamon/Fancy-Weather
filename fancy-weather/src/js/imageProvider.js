class ImageProvider {
  async getImage(town) {
    this._URL = `https://api.unsplash.com/photos/random?query=town,${town}&client_id=d2271d9ed6848a1ddfce1f192b442f96d32f8816e03960b75f4a8563bde581cf`;
    const res = await fetch(this._URL);
    if (res.headers.get('x-ratelimit-remaining') === '5') {
      alert('Осталость 5 обновлений');
    }
    return res.json();
  }
}

module.exports = {
  ImageProvider,
};
