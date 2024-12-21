import initialCards from "./cards.js";

// DOM узлы
const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
const popupCloseButton = popupImage.querySelector('.popup__close');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpenButton = document.querySelector('.profile__add-button');
const popupNewCardCloseButton = popupNewCard.querySelector('.popup__close');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const cardNameInput = popupNewCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = popupNewCardForm.querySelector('.popup__input_type_url');

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const popupEditProfileForm = popupEditProfile.querySelector('.popup__form');
const profileNameInput = popupEditProfileForm.querySelector('.popup__input_type_name');
const profileDescriptionInput = popupEditProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Функция создания карточки
function createCard(data) {
    const cardElement = cardTemplate.content.cloneNode(true).querySelector('.card');
    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    imageElement.src = data.link;
    imageElement.alt = data.name;
    titleElement.textContent = data.name;

    // Добавляем обработчик удаления
    deleteButton.addEventListener('click', () => removeCard(cardElement));

    // Добавляем обработчик лайка
    likeButton.addEventListener('click', () => toggleLike(likeButton));

    // Добавляем обработчик открытия попапа с изображением
    imageElement.addEventListener('click', () => openImagePopup(data));

    return cardElement;
}

// Функция удаления карточки
function removeCard(card) {
    card.remove();
}

// Функция переключения лайка
function toggleLike(button) {
    button.classList.toggle('card__like-button_is-active');
}

// Функция открытия попапа с изображением
function openImagePopup(data) {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupCaption.textContent = data.name;
    openPopup(popupImage);
}

// Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

// Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

// Добавляем обработчик для закрытия попапа с изображением
popupCloseButton.addEventListener('click', () => closePopup(popupImage));

// Обработчик открытия попапа добавления новой карточки
popupNewCardOpenButton.addEventListener('click', () => openPopup(popupNewCard));

// Обработчик закрытия попапа добавления новой карточки
popupNewCardCloseButton.addEventListener('click', () => closePopup(popupNewCard));

// Обработчик отправки формы добавления новой карточки
popupNewCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCard = createCard({
        name: cardNameInput.value,
        link: cardLinkInput.value,
    });
    placesList.prepend(newCard);
    closePopup(popupNewCard);
});

// Обработчик открытия попапа редактирования профиля
popupEditProfileOpenButton.addEventListener('click', () => {
    profileNameInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    openPopup(popupEditProfile);
});

// Обработчик закрытия попапа редактирования профиля
popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

// Обработчик отправки формы редактирования профиля
popupEditProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(popupEditProfile);
});

// Вывести карточки на страницу
initialCards.forEach((data) => {
    const card = createCard(data);
    placesList.appendChild(card);
});