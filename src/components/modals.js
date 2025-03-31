// Работа модальных окон

const openModal = (el) => {
  // el.classList.add("popup_is-animated");
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePressEscapeModal);
  el.addEventListener("mousedown", closeOnOverlayModal);
};

const closeModal = (el) => {
  el.classList.remove("popup_is-opened");
  // el.classList.remove("popup_is-animated");
  document.removeEventListener("keydown", closePressEscapeModal);
  el.removeEventListener("mousedown", closeOnOverlayModal);
};

const closeOnOverlayModal = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
};

const closePressEscapeModal = (evt) => {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

export { openModal, closeModal };
