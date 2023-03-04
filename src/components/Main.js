import React from 'react';
import ava from '../images/profile/ava.jpg';
import MyApi from '../utils/Api';
import Card from './Card';

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onPreloaderHide,
  onConfirmPopupOpen,
}) => {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([MyApi.getUserInfo(), MyApi.getInitialCards()])
      .then(([{ name, about, avatar, _id }, cards]) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
        setCards(cards);
      })
      .catch((err) => console.log(err))
      .finally(() => onPreloaderHide());
  }, []);

  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div className="profile__avatar profile__avatar_type_circle">
          <img src={userAvatar ? userAvatar : ava} alt="Аватар" className="profile__img" />
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__button profile__button_action_edit-avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__button profile__button_action_edit profile__button_margin_bottom"
          />
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__button profile__button_action_add"
        />
      </section>

      <section className="photo-gallery content__photo-gallery" aria-label="Фото Галерея">
        <ul className="photo-gallery__items">
          {cards.map((card, i) => (
            <Card
              card={card}
              key={i}
              onCardClick={onCardClick}
              onConfirmPopupOpen={onConfirmPopupOpen}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
