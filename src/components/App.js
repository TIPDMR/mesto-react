import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import Preloader from './Preloader';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Api from '../utils/api';
import avatar from '../images/profile/ava.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCard from './ConfirmDeleteCard';

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [isPreloaderHide, setPreloaderHide] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка...',
    about: 'Загрузка...',
    avatar: avatar,
  });

  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err))
      .finally(() => onPreloaderHide());
  }, []);

  /**
   * Установка Like
   * @param card
   */
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    const requestLiked = isLiked ? Api.delLike(card._id) : Api.setLike(card._id);

    requestLiked
      .then((newCard) => {
        setCards((state) => state.map((item) => (item._id === card._id ? newCard : item)));
      })
      .catch((err) => console.log(err));
  }

  /**
   * Удаление карточки
   * @param card
   */
  function handleCardDelete(card) {
    setIsLoading(true);
    Api.delCard(card._id)
      .then((newCard) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  /**
   * Обновление данных
   * Пользователя
   * @param name
   * @param about
   */
  function handleUpdateUser(name, about) {
    setIsLoading(true);
    Api.setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  /**
   * Обновление аватара
   * Пользователя
   * @param avatar
   */
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    Api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  /**
   * Добавление новой карточки
   * @param name
   * @param link
   */
  function handleAddPlace(name, link) {
    setIsLoading(true);
    Api.setCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function onPreloaderHide() {
    setPreloaderHide(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleConfirmPopupOpen(card) {
    setSelectedCard({ isOpen: false, ...card });
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
    setSelectedCard({ isOpen: false });
  }

  function onCloseClickOverlay(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onConfirmPopupOpen={handleConfirmPopupOpen}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onCloseClickOverlay={onCloseClickOverlay}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onCloseClickOverlay={onCloseClickOverlay}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCloseClickOverlay={onCloseClickOverlay}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
          />
          <ConfirmDeleteCard
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onCloseClickOverlay={onCloseClickOverlay}
            onClickConfirm={handleCardDelete}
            isLoading={isLoading}
            card={selectedCard}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseClickOverlay={onCloseClickOverlay}
          />
          <Preloader isHide={isPreloaderHide} />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
