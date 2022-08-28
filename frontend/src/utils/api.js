export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  //функция ошибки
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  };
  // получение карточек
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  // отправка карточки
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data["place"], link: data["link"] }),
    }).then(this._checkResponse);
  }
  //удаление карточки

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  toggleLike(id, status) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: status ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  //отправка данных пользователя
  getUsers() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
  //замена данных профайла
  patchUsers(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data["user"], about: data["about"] }),
    }).then(this._checkResponse);
  }
  // замена данных аватара
  patchAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: data["avatar"] }),
    }).then(this._checkResponse);
  }
  // getAllPromise() {
  //     return Promise.all([this.getCards(), this.getUsers()]);
  //   }
}
export const apiCards = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "32ffaefa-9d9c-436d-9639-a2500716ba37",
    "Content-Type": "application/json",
  },
});
