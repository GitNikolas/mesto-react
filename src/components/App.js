import React from 'react';
import '../index.css';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './Popups/PopupWithForm.jsx';
import EditProfilePopup from './Popups/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import ImagePopup from './Popups/ImagePopup.jsx';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import SubmitButton from './UI/SubmitButton/SubmitButton';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState(null);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInformation()])
    .then( ([dataCard, dataUser]) => {
      setCards(dataCard);
      setCurrentUser(dataUser);
      })
    .catch((err) => console.error(`Ошибка: ${err}`))
  }, [])

  //функции открытия попапов
  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true)
  }

  //функция открытия попапа с фотографией
  function handleCardClick (card) {
    setSelectedCard(card)
  }

  // функция закрытия попапов
  function closeAllPopups () {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  //запросы к api
  function handleCardLike(card) {
    api.handleLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleCarDislike(card) {
    api.deleteLike(card._id)
    .then((newCard) => {
      setCards( (state) => state.map((item) => item._id === card._id ? newCard : item));
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then( () => {
      setCards( (state) => state.filter((item) => item._id !== card._id))
    })
    .catch((err) => console.error(`Ошибка: ${err}`));
  }

function handleUpdateUser(userData) {
  api.setUserInformation(userData)
  .then( () => {
    setCurrentUser((state)=>({ ...state, name:userData.name, about:userData.about }));
    closeAllPopups();
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
}

function handleUpdateAvatar(avatarData) {
  api.setUserAvatar(avatarData)
  .then( () => {
    setCurrentUser((state)=>({ ...state, avatar:avatarData.avatar }));
    closeAllPopups();
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
}

function handleAddPlaceSubmit(cardData) {
  api.setInitialCard(cardData)
  .then( (newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups();
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="flex-container">

          <Header />

          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDislike={handleCarDislike}
            onCardDelete={handleCardDelete}
          >
          </ Main>

        </div>

        <Footer />

        { currentUser && <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />}

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />

        { currentUser && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />}

        <PopupWithForm
          name='confirmation'
          title='Вы уверены?'
          formId="popupFormConfirmation"
        >
          <SubmitButton>Да</SubmitButton>

        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>


  );
}

export default App;
