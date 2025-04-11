const placesSection = document.querySelector(".places");
const placesContainer = placesSection.querySelector(".places__list");

const deleteCard = (e) => {
  e.target.closest("li").remove();
};

const createCard = (el, handleDelete, handleLike, handleZoomImage, meId) => {
  const cardOwnerId = el.owner["_id"];
  const cardId = el["_id"];

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    // .querySelector(".places__item")
    .querySelector(".card")
    .cloneNode(true);

  const deleteCardBtn = cardElement.querySelector(".card__delete-button");
  if (cardOwnerId === meId) {
    deleteCardBtn.addEventListener("click", () => {
      handleDelete({
        cardId: cardId,
        btnElem: deleteCardBtn,
      });
    });
  } else {
    deleteCardBtn.style.display = "none";
  }

  const likeCounter = cardElement.querySelector(".card__like-counter");
  if (el.likes.length) {
    likeCounter.classList.add("card__like-counter_is-active");
    likeCounter.textContent = el.likes.length;
  }

  const likeCardBtn = cardElement.querySelector(".card__like-button");
  el.likes.forEach((likeId) => {
    if (likeId === meId) {
      likeCardBtn.classList.add("card__like-button_is-active");
    }
  });

  likeCardBtn.addEventListener("click", () => {
    handleLike({
      cardId: cardId,
      btn: likeCardBtn,
      counterElement: likeCounter,
    });
  });

  cardElement.querySelector(".card__image").src = el.link;
  cardElement.querySelector(".card__title").textContent = el.name;

  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", function () {
    handleZoomImage({ name: el.name, link: el.link });
  });

  return cardElement;
};

export { createCard, deleteCard };
