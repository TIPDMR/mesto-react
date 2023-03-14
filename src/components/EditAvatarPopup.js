import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onCloseClickOverlay, onUpdateAvatar, isLoading }) => {
  const inputAvatar = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputAvatar.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="avatar-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCloseClickOverlay={onCloseClickOverlay}>
      <input
        className="modal__input modal__input_name_avatar-link"
        type="url"
        ref={inputAvatar}
        name="avatar-link"
        id="avatar-link"
        placeholder="https://somewebsite.com/someimage.jpg"
        required
      />
      <span className="modal__input-error avatar-link-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
