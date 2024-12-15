// @todo: Темплейт карточки
const placesSection = document.querySelector(".places");
const placesContainer = placesSection.querySelector(".places__list");
let placeListItems = placesContainer.querySelectorAll("li");
const placeListItemsArray = Array.from(placeListItems);
let deleteCardBtn = document.querySelector(".card__delete-button");
let deleteCardBtnList = document.querySelectorAll(".card__delete-button");

// @todo: DOM узлы

// @todo: Функция создания карточки
const createCard = (el) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteCardBtn = cardElement.querySelector(".card__delete-button");
  deleteCardBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.closest("li").remove();
  });

  cardElement.querySelector(".card__image").src = el.link;
  cardElement.querySelector(".card__description").textContent = el.name;
  cardElement.querySelector(".card__description").alt = el.name;
  return cardElement;
};

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const newCardBtn = document.querySelector(".profile__add-button");
const popUpWindow = document.querySelector(".popup");
const popUpForm = document.querySelector(".popup__form");

const popUpNewCard = document.querySelector(".popup_type_new-card");
const newCardCloseBtn = popUpNewCard.querySelector(".popup__close");
const addPlaceBtn = popUpNewCard.querySelector(".popup__button");

function allCards() {
  const placeListItemsArray = placesContainer.querySelectorAll("li");

  placeListItemsArray.forEach((el) => {
    console.log(el);
  });
}

const showPopUpNewCard = () => {
  popUpNewCard.classList.add("popup_is-opened");
};

const closePopUpNewCard = () => {
  popUpNewCard.classList.remove("popup_is-opened");
};

// newCardBtn.addEventListener("click", showPopUpNewCard);
newCardBtn.addEventListener("click", showPopUpNewCard);
newCardCloseBtn.addEventListener("click", closePopUpNewCard);

function render() {
  placeListItems = placesContainer.querySelectorAll("li");
  placeListItemsArray.push(cardElement);
}

// Add new place
addPlaceBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const placeName = document.querySelector(".popup__input_type_card-name");
  const placeLink = document.querySelector(".popup__input_type_url");
  console.log(placeName.value);

  const cardObj = {
    name: placeName.value,
    link: placeLink.value,
  };

  const cardElement = createCard(cardObj);
  placesContainer.append(cardElement);
  closePopUpNewCard();
  render();
});

// https://unsplash.com/photos/a-bird-flying-in-the-sky-with-a-sunset-in-the-background-7lzw_-bE7LA
