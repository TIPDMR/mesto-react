import React from 'react';

const Card = ({card, onCardClick, onConfirmPopupOpen}) => {
  const {name, link, likes} = card;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="photo-gallery__element">
      <article className="photo-gallery__card">
        <img className="photo-gallery__image" alt={name} src={link} onClick={handleClick}/>
        <div className="photo-gallery__figcaption">
          <h2 className="photo-gallery__title">{name}</h2>
          <div className="photo-gallery__like-container">
            <button
              type="button"
              className="photo-gallery__button photo-gallery__button_action_like"
            />
            <span className="photo-gallery__likes-number">{likes.length}</span>
          </div>
        </div>
        <button
          type="button"
          className="photo-gallery__button photo-gallery__button_action_trash"
          onClick={onConfirmPopupOpen}
        />
      </article>
    </li>
  );
};

export default Card;
