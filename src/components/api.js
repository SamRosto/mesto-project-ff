const CONFIG = {
  path: "https://mesto.nomoreparties.co",
  pathVersion: "v1",
  headers: {
    authorization: "9f0cbd30-2dcf-42ac-bcb9-8431eb2e9ecf",
    "Content-Type": "application/json",
  },
  cohortId: "wff-cohort-35",
};

const BASEPATH = `${CONFIG.path}/${CONFIG.pathVersion}/${CONFIG.cohortId}`;

const handlePromiseResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const _createCard = (path, cardObj) => {
  return fetch(`${BASEPATH}${path}`, {
    method: "POST",
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: cardObj.name,
      link: cardObj.link,
    }),
  }).then(handlePromiseResponse);
};

const _getData = (path) => {
  return fetch(`${BASEPATH}${path}`, {
    method: "GET",
    headers: CONFIG.headers,
  }).then(handlePromiseResponse);
};

const _deleteCard = (path) => {
  return fetch(`${BASEPATH}${path}`, {
    method: "DELETE",
    headers: CONFIG.headers,
  }).then(handlePromiseResponse);
};

const _updateUserInfo = (path, userData) => {
  return fetch(`${BASEPATH}${path}`, {
    method: "PATCH",
    headers: CONFIG.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  }).then(handlePromiseResponse);
};

const _userUpdateAvatar = (path, imgLink) => {
  return fetch(`${BASEPATH}${path}`, {
    method: "PATCH",
    headers: CONFIG.headers,
    body: JSON.stringify({
      avatar: imgLink,
    }),
  }).then(handlePromiseResponse);
};

const _modifyLike = (path, cardId, HTTPMethd) => {
  return fetch(`${BASEPATH}${path}/${cardId}`, {
    method: HTTPMethd,
    headers: CONFIG.headers,
  }).then(handlePromiseResponse);
};

const makeCrud = () => ({
  getCards: (path) => _getData(path),
  createCard: (path, user) => _createCard(path, user),
  deleteCard: (path) => _deleteCard(path),
  updateCard: () => _updateCard(),
  userInfo: (path) => _getData(path),
  userUpdate: (path, userData) => _updateUserInfo(path, userData),
  userUpdateAvatar: (path, imgLink) => _userUpdateAvatar(path, imgLink),
  modifyLike: (path, cardId, HTTPMethd) => _modifyLike(path, cardId, HTTPMethd),
});

export const crudAPI = makeCrud();
