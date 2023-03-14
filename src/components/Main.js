import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onConfirmPopupOpen,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(CardsContext);
  const emptyCards = Object.keys(cards).length === 0;

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar profile__avatar_type_circle">
          <img src={currentUser.avatar} alt="Аватар" className="profile__img" />
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__button profile__button_action_edit-avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__button profile__button_action_edit profile__button_margin_bottom"
          />
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__button profile__button_action_add"
        />
      </section>

      <section className="photo-gallery content__photo-gallery" aria-label="Фото Галерея">
        <ul className="photo-gallery__items">
          {!emptyCards &&
            cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onConfirmPopupOpen={onConfirmPopupOpen}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
