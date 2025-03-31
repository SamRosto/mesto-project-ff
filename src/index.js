import "./index.css";

import { openModal, closeModal } from "./components/modals";
import { createCard, deleteCard } from "./components/card";
import { initialCards } from "./components/cards";

const placesSection = document.querySelector(".places");
const placesContainer = placesSection.querySelector(".places__list");
const newPlaceForm = document.forms["new-place"];
const placeName = newPlaceForm.elements["place-name"];
const placeLink = newPlaceForm.elements.link;

const placeListItems = placesContainer.querySelectorAll("li");
const placeListItemsArray = Array.from(placeListItems);
let deleteCardBtn = document.querySelector(".card__delete-button");
let deleteCardBtnList = document.querySelectorAll(".card__delete-button");

// DOM CARDS
const newCardBtn = document.querySelector(".profile__add-button");
const popUpWindow = document.querySelector(".popup");
const popUpForm = document.querySelector(".popup__form");
const popUpNewCard = document.querySelector(".popup_type_new-card");
popUpNewCard.classList.add("popup_is-animated");
const newCardCloseBtn = popUpNewCard.querySelector(".popup__close");
const addPlaceBtn = popUpNewCard.querySelector(".popup__button");

// Profile DOM elems
const popUpEditProfile = document.querySelector(".popup_type_edit");
popUpEditProfile.classList.add("popup_is-animated");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileCloseBtn = popUpEditProfile.querySelector(".popup__close");

// Profile data
const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Profile Form DOM
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const profileFormSubmitButton = editProfileForm.querySelector(".popup__button");

// Image DOM
const popupImage = document.querySelector(".popup_type_image");
popupImage.classList.add("popup_is-animated");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCloseBtn = popupImage.querySelector(".popup__close");

// FORM EDITING PROFILE
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;

  closePopUpEditProfile();
}
editProfileForm.addEventListener("submit", editProfileFormSubmit);

const showPopUpEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popUpEditProfile);
};

const closePopUpImage = () => {
  closeModal(popupImage);
};

popupImageCloseBtn.addEventListener("click", closePopUpImage);

const closePopUpEditProfile = () => {
  closeModal(popUpEditProfile);
};

editProfileBtn.addEventListener("click", showPopUpEditProfile);
editProfileCloseBtn.addEventListener("click", closePopUpEditProfile);

// Zoom Image
const zoomImage = ({ name, link }) => {
  popupImageContent.alt = name;
  popupImageContent.src = link;
  popupImageCaption.textContent = name;

  openModal(popupImage);
};

const likeCard = (e) => {
  e.preventDefault();
  e.target.classList.add("card__like-button_is-active");
};

function allCards() {
  const placeListItemsArray = placesContainer.querySelectorAll("li");

  placeListItemsArray.forEach((el) => {
    console.log(el);
  });
}

const showPopUpNewCard = () => {
  openModal(popUpNewCard);
};

const closePopUpNewCard = () => {
  closeModal(popUpNewCard);
};

// FORM ADDING NEW CARD
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const placeNameValue = placeName.value;
  const placeLinkValue = placeLink.value;
  // console.log(placeName.value);

  const cardObj = {
    name: placeNameValue,
    link: placeLinkValue,
  };

  const cardElement = createCard(cardObj, deleteCard, likeCard, zoomImage);
  placesContainer.prepend(cardElement);

  placeName.value = "";
  placeLink.value = "";

  closePopUpNewCard();
}
newPlaceForm.addEventListener("submit", handleNewCardFormSubmit);

newCardBtn.addEventListener("click", showPopUpNewCard);
newCardCloseBtn.addEventListener("click", closePopUpNewCard);

// LOADS INITIAL CARDS
const loadInitial = (deleteCard, likeCard, zoomImage) => {
  initialCards.forEach((el) => {
    const cardElement = createCard(el, deleteCard, likeCard, zoomImage);
    placesContainer.append(cardElement);
  });
};

loadInitial(deleteCard, likeCard, zoomImage);
