class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка => ${res.status}`);
  }

  _request(url, config) {
    return fetch(`${this._baseUrl}${url}`, config).then((res) => this._checkResult(res));
  }

  getInitialCards() {
    return this._request('/cards', { headers: this._headers });
  }

  getUserInfo() {
    return this._request('/users/me', { headers: this._headers, method: 'GET' });
  }

  setUserInfo(name, about) {
    return this._request('/users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  setCard(name, link) {
    return this._request('/cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  setLike(_id) {
    return this._request(`/cards/${_id}/likes`, {
      headers: this._headers,
      method: 'PUT',
    });
  }

  delLike(_id) {
    return this._request(`/cards/${_id}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

  delCard(_id) {
    return this._request(`/cards/${_id}`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

  setAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }
}

const MyApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'bae80771-0801-41af-a64f-417707c2f376',
    'Content-Type': 'application/json',
  },
});
export default MyApi;
