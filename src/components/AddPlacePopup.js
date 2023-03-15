import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onCloseClickOverlay, onAddPlace, isLoading }) => {

  const [name, setName] = React.useState('');
  const [imageLink, setImageLink] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) return;

    return () => {
      setName('');
      setImageLink('');
    };
  }, [isOpen]);


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeImage(e) {
    setImageLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, imageLink);
  }

  return (
    <PopupWithForm
      title="Новое место"
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name="img-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCloseClickOverlay={onCloseClickOverlay}>
      <input
        className="modal__input modal__input_name_card-name"
        pattern="^((?!\s{2}).)*$"
        type="text"
        name="card-name"
        id="card-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleChangeName}
        value={name}
        required
      />
      <span className="modal__input-error card-name-error"></span>
      <input
        className="modal__input modal__input_name_card-img"
        name="card-img"
        id="card-img"
        placeholder="Ссылка на картинку"
        onChange={handleChangeImage}
        type="url"
        value={imageLink}
        required
      />
      <span className="modal__input-error card-img-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
