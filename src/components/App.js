import React from 'react';
import '../index.css';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './Popups/PopupWithForm.jsx';
import ImagePopup from './Popups/ImagePopup.jsx';
import SubmitButton from './UI/SubmitButton/SubmitButton'
import Input from './UI/Input/Input'



function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

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
    setSelectedCard(false);
  }

  return (
    <div className="App">
      <div className="flex-container">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        >
        </ Main>

      </div>

      <Footer />

      <PopupWithForm
        name='profile-edit'
        title='Редактировать профиль'
        formId='popupFormEditProfile'
        isOpen = { isEditProfilePopupOpen }
        onClose = {closeAllPopups}
      >
        <Input
          id="userName"
          className="popup__input popup__input_type_user-name"
          minLength={2}
          maxLength={40}
          name="userName"
          placeholder="Как вас зовут?"
        >
        </Input>

        <Input
          id="userStatus"
          className="popup__input popup__input_type_user-status"
          minLength={2}
          maxLength={200}
          name="userStatus"
          placeholder="Чем вы занимаетесь?"
        >
        </Input>

        <SubmitButton>Сохранить</SubmitButton>
      </PopupWithForm>

      <PopupWithForm
        name='add-photo'
        title='Новое место'
        formId="popupFormAddPhoto"
        isOpen = { isAddPlacePopupOpen }
        onClose = {closeAllPopups}
      >
        <Input
          id="placeName"
          className="popup__input popup__input_type_place-name"
          minLength={2}
          maxLength={30}
          name="name"
          placeholder="Название"
        >
        </Input>

        <Input
          id="pictureUrl"
          className="popup__input popup__input_type_picture-url"
          minLength={2}
          maxLength={30}
          name="link"
          placeholder="Ссылка на картинку"
        >
        </Input>

        <SubmitButton>Создать</SubmitButton>
      </PopupWithForm>

      <PopupWithForm
        name='avatar-update'
        title='Обновить аватар'
        formId="popupFormChangeAvatar"
        isOpen = { isEditAvatarPopupOpen }
        onClose = {closeAllPopups}
      >

        <Input
          id="avatarUrl"
          className="popup__input popup__input_type_avatar-Url"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
        >
        </Input>

        <SubmitButton>Сохранить</SubmitButton>
      </PopupWithForm>

      <PopupWithForm
        name='confirmation'
        title='Вы уверены?'
        formId="popupFormConfirmation"
      >
        <SubmitButton>Да</SubmitButton>

      </PopupWithForm>

      <ImagePopup
      card = {selectedCard}
      onClose = {closeAllPopups}
      />

    </div>

  );
}

export default App;
