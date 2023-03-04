import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Preloader from './Preloader';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, data: [] });
  const [isPreloaderHide, setPreloaderHide] = React.useState(false);

  function handlePreloaderHide() {
    setPreloaderHide(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleConfirmPopupOpen() {
    setConfirmPopupOpen(!isConfirmPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card });
  }

  function closeAllPopups() {
    setConfirmPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, data: [] });
  }

  function onCloseClickOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onPreloaderHide={handlePreloaderHide}
        onConfirmPopupOpen={handleConfirmPopupOpen}
      />
      <Footer />
      <PopupWithForm
        title="Обновить аватар"
        buttonText="Сохранить"
        name="avatar-edit"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseClickOverlay={onCloseClickOverlay}
      >
        <input
          className="modal__input modal__input_name_avatar-link"
          type="url"
          name="avatar-link"
          id="avatar-link"
          placeholder="https://somewebsite.com/someimage.jpg"
          required
        />
        <span className="modal__input-error avatar-link-error"></span>
      </PopupWithForm>
      <PopupWithForm
        title="Вы уверены?"
        buttonText="Сохранить"
        name="confirm"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onCloseClickOverlay={onCloseClickOverlay}
      >
        {' '}
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        buttonText="Сохранить"
        name="img-add"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseClickOverlay={onCloseClickOverlay}
      >
        <input
          className="modal__input modal__input_name_card-name"
          pattern="^((?!\s{2}).)*$"
          type="text"
          name="card-name"
          id="card-name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="modal__input-error card-name-error"></span>
        <input
          className="modal__input modal__input_name_card-img"
          name="card-img"
          id="card-img"
          placeholder="Ссылка на картинку"
          type="url"
          required
        />
        <span className="modal__input-error card-img-error"></span>
      </PopupWithForm>

      <PopupWithForm
        title="Редактировать профиль"
        buttonText="Сохранить"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseClickOverlay={onCloseClickOverlay}
      >
        <input
          className="modal__input modal__input_name_name"
          pattern="^((?!\s{2}).)*$"
          type="text"
          name="user-name"
          id="user-name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          required
        />
        <span className="modal__input-error user-name-error"></span>
        <input
          className="modal__input modal__input_name_about"
          pattern="^((?!\s{2}).)*$"
          type="text"
          name="user-about"
          id="user-about"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          required
        />
        <span className="modal__input-error user-about-error"></span>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onCloseClickOverlay={onCloseClickOverlay}
      />
      <Preloader isHide={isPreloaderHide} />
    </div>
  );
};

export default App;
