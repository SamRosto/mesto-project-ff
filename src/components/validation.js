const hasInvalidInput = (inputList) =>
  inputList.some((input) => !input.validity.valid);

const showInputError = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  errorMessage,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;

  inputElement.classList.add(inputErrorClass);
};

const hideInputError = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";

  inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) => {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorUrl);
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorPattern);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement,
      inputElement,
      errorMessage: inputElement.validationMessage,
      errorClass,
      inputErrorClass,
    });
  } else {
    hideInputError({
      formElement,
      inputElement,
      errorClass,
      inputErrorClass,
    });
  }
};

const toggleButtonState = ({
  inputList,
  submitButtonElement,
  inactiveButtonClass,
}) => {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = ({
  formElement,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass,
}) => {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity({
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
      });
      toggleButtonState({
        inputList,
        submitButtonElement,
        inactiveButtonClass,
      });
    });
  });
};

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners({
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
};

const clearValidation = (
  formElement,
  {
    submitButtonSelector,
    inactiveButtonClass,
    inputSelector,
    inputErrorClass,
    errorClass,
  }
) => {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
    });
  });

  toggleButtonState({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });
};

export { enableValidation, clearValidation };
