import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onCloseClickOverlay, onUpdateUser, isLoading }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    if (!isOpen) return;
    setName(currentUser.name);
    setDescription(currentUser.about);
    return () => {
      setName('');
      setDescription('');
    };
  }, [currentUser.name, currentUser.about, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCloseClickOverlay={onCloseClickOverlay}>
      <input
        className="modal__input modal__input_name_name"
        pattern="^((?!\s{2}).)*$"
        type="text"
        name="user-name"
        id="user-name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name && name}
        onChange={handleChangeName}
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
        value={description && description}
        onChange={handleChangeDescription}
        required
      />
      <span className="modal__input-error user-about-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
