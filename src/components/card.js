const placesSection = document.querySelector(".places");
const placesContainer = placesSection.querySelector(".places__list");

const deleteCard = (e) => {
  e.target.closest("li").remove();
};

const createCard = (el, handleDelete, handleLike, handleZoomImage) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const deleteCardBtn = cardElement.querySelector(".card__delete-button");
  deleteCardBtn.addEventListener("click", handleDelete);

  const likeCardBtn = cardElement.querySelector(".card__like-button");
  likeCardBtn.addEventListener("click", handleLike);

  cardElement.querySelector(".card__image").src = el.link;
  // cardElement.querySelector(".card__description").textContent = el.name;
  cardElement.querySelector(".card__title").textContent = el.name;

  const image = cardElement.querySelector(".card__image");
  image.addEventListener("click", function () {
    handleZoomImage({ name: el.name, link: el.link });
  });

  return cardElement;
};

export { createCard, deleteCard };
