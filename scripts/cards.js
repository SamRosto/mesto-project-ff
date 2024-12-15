const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const placesSection = document.querySelector(".places");
const placesContainer = placesSection.querySelector(".places__list");

const deleteCard = (e) => {
  e.preventDefault();
  e.target.closest("li").remove();
};

const createCard = (el, handleDelete) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteCardBtn = cardElement.querySelector(".card__delete-button");
  deleteCardBtn.addEventListener("click", handleDelete);

  cardElement.querySelector(".card__image").src = el.link;
  cardElement.querySelector(".card__description").textContent = el.name;
  return cardElement;
};

initialCards.forEach((el) => {
  const cardElement = createCard(el, deleteCard);
  placesContainer.append(cardElement);
});
