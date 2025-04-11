import "./index.css";

import { openModal, closeModal } from "./components/modals";
import { createCard, deleteCard } from "./components/card";
import { initialCards } from "./components/cards";

import { crudAPI } from "./components/api";
import { enableValidation, clearValidation } from "./components/validation";

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

// Avatar DOM
const popupAvatar = document.querySelector(".popup_type_edit-avatar");
popupAvatar.classList.add("popup_is-animated");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.elements.avatar;
const avatarFormSubmitButton = avatarForm.querySelector(".popup__button");
const avatarFormCloseBtn = popupAvatar.querySelector(".popup__close");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const renderLoading = ({ buttonElement, isLoading }) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

const userInfo = () => {
  return crudAPI.userInfo("/users/me");
};

// Avatar edit
const updateAvatar = (link) => {
  return crudAPI.userUpdateAvatar("/users/me/avatar", link);
};

const editAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: avatarFormSubmitButton,
    isLoading: true,
  });

  const avatarLink = avatarInput.value;

  updateAvatar(avatarLink)
    .then((res) => {
      console.log(res);
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      renderLoading({
        buttonElement: avatarFormSubmitButton,
        isLoading: false,
      });
    });

  closeAvatarEditForm();
};

avatarForm.addEventListener("submit", editAvatarFormSubmit);

const handlePopupAvatarForm = () => {
  clearValidation(avatarForm, validationConfig);
  openModal(popupAvatar);
};

const closeAvatarEditForm = () => {
  closeModal(popupAvatar);
};

profileImage.addEventListener("click", handlePopupAvatarForm);
avatarFormCloseBtn.addEventListener("click", closeAvatarEditForm);

// FORM EDITING PROFILE
const editProfileFormSubmit = (evt) => {
  evt.preventDefault();

  renderLoading({
    buttonElement: profileFormSubmitButton,
    isLoading: true,
  });

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  changeUserInfo(nameInputValue, jobInputValue)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() =>
      renderLoading({
        buttonElement: profileFormSubmitButton,
        isLoading: false,
      })
    );

  closePopUpEditProfile();
};
editProfileForm.addEventListener("submit", editProfileFormSubmit);

const showPopUpEditProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(popUpEditProfile);
};

const closePopUpEditProfile = () => {
  closeModal(popUpEditProfile);
};

editProfileBtn.addEventListener("click", showPopUpEditProfile);
editProfileCloseBtn.addEventListener("click", closePopUpEditProfile);

const closePopUpImage = () => {
  closeModal(popupImage);
};
popupImageCloseBtn.addEventListener("click", closePopUpImage);

// Zoom Image
const zoomImage = ({ name, link }) => {
  popupImageContent.alt = name;
  popupImageContent.src = link;
  popupImageCaption.textContent = name;

  openModal(popupImage);
};

// Like Card
const likeCard = ({ cardId, btn, counterElement }) => {
  // btn.disabled = true;

  if (btn.classList.contains("card__like-button_is-active")) {
    crudAPI
      .modifyLike("/cards/likes", cardId, "DELETE")
      .then(({ likes }) => {
        btn.classList.remove("card__like-button_is-active");

        if (likes.length) {
          counterElement.classList.add("card__like-counter_is-active");
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove("card__like-counter_is-active");
          counterElement.textContent = "";
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        btn.disabled = false;
      });
  } else {
    crudAPI
      .modifyLike("/cards/likes", cardId, "PUT")
      .then(({ likes }) => {
        btn.classList.add("card__like-button_is-active");

        counterElement.classList.add("card__like-counter_is-active");
        counterElement.textContent = likes.length;
      })
      .catch((error) => console.error(error))
      .finally(() => {
        btn.disabled = false;
      });
  }
};
// // Like Card
// const likeCard = (e) => {
//   e.preventDefault();
//   e.target.classList.add("card__like-button_is-active");
// };

function allCards() {
  const placeListItemsArray = placesContainer.querySelectorAll("li");

  placeListItemsArray.forEach((el) => {
    console.log(el);
  });
}

const showPopUpNewCard = () => {
  clearValidation(newPlaceForm, validationConfig);
  openModal(popUpNewCard);
};

const closePopUpNewCard = () => {
  closeModal(popUpNewCard);
};

const deleteCardHandler = ({ cardId, btnElem }) => {
  crudAPI
    .deleteCard(`/cards/${cardId}`)
    .then(() => {
      btnElem.closest(".card").remove();
    })
    .catch((err) => {
      console.log(`${err}`);
    });
};

const createNewCardReq = (name, link) => {
  return crudAPI.createCard("/cards", { name, link });
};

// FORM ADDING NEW CARD
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading({
    buttonElement: addPlaceBtn,
    isLoading: true,
  });

  const cardObj = {
    name: placeName.value,
    link: placeLink.value,
  };

  createNewCardReq(cardObj.name, cardObj.link).then((res) => {
    console.log(res);
    const cardElement = createCard(
      res,
      deleteCardHandler,
      likeCard,
      zoomImage,
      res.owner["_id"]
    );
    placesContainer.prepend(cardElement);
  });

  placeName.value = "";
  placeLink.value = "";

  closePopUpNewCard();
}

newPlaceForm.addEventListener("submit", handleNewCardFormSubmit);
newCardBtn.addEventListener("click", showPopUpNewCard);
newCardCloseBtn.addEventListener("click", closePopUpNewCard);

const changeUserInfo = (name, description) => {
  const user = {
    name: name,
    about: description,
  };
  return crudAPI.userUpdate("/users/me", user);
};

const setProfile = (userObj) => {
  profileName.textContent = userObj.name;
  profileDescription.textContent = userObj.about;
  profileImage.style.backgroundImage = `url(${userObj.avatar})`;
};

Promise.all([crudAPI.userInfo("/users/me"), crudAPI.getCards("/cards")]).then(
  (res) => {
    const userResult = res[0];
    const cardsResult = res[1];
    console.log(userResult);
    setProfile(userResult);

    cardsResult.forEach((cardElem) => {
      const cardElement = createCard(
        cardElem,
        deleteCardHandler,
        likeCard,
        zoomImage,
        userResult["_id"]
      );
      placesContainer.append(cardElement);
    });
  }
);
