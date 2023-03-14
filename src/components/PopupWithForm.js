import React from 'react';

const PopupWithForm = ({
  title,
  buttonText,
  name,
  isOpen,
  onClose,
  onCloseClickOverlay,
  children,
  onSubmit,
  isLoading,
}) => {
  function handleEscClose(evn) {
    if (evn.key === 'Escape') {
      onClose();
    }
  }

  React.useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);
  return (
    <div
      className={`modal modal_form_${name} ${isOpen ? 'modal_visible' : ''}`}
      tabIndex="-1"
      role="dialog"
      onClick={onCloseClickOverlay}>
      <div className="modal__container" role="document">
        <button
          type="button"
          className="modal__button modal__button_action_close"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>
        <form
          className={`modal__form modal__form-${name}`}
          name={`${name}__form`}
          onSubmit={onSubmit}
          action="#">
          {children}
          <button
            type="submit"
            className={`modal__button modal__button_action_save
            ${isOpen && isLoading ? 'modal__button_disabled' : ''}`}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
