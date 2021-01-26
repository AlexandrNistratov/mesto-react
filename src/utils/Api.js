class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo () {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  addUserInfo (data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  getAllCards() {
    return fetch(this._url,{
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  addNewCards(data) {
    return fetch(this._url,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  deleteCards(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
  }

  likeCard(likeId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${likeId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }else  {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  dislikeCard(likeId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${likeId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }else  {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }

  addUserAvatar (data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar ', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }
}

export  const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/cards',
  headers: {
    authorization: 'e2315ec0-9d36-47b6-91be-ca15417afdd8',
    'content-type': 'application/json'
  }
});
