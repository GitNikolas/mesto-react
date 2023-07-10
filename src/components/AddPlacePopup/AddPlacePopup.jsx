import React from "react";
import PopupWithForm from "../Popups/PopupWithForm";
import Input from "../UI/Input/Input";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace}) => {

const [placeName, setPlaceName] = React.useState('');
const [placeUrl, setPlaceUrl] = React.useState('');

function handlePlaceNameChange(event) {
  setPlaceName(event.target.value);
}

function handlePlaceUrlChange(event) {
  setPlaceUrl(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  onAddPlace(
    {
      name:placeName,
      link:placeUrl,
    }
  );
  setPlaceName('');
  setPlaceUrl('');
}

return (
  <PopupWithForm
    name='add-photo'
    title='Новое место'
    formId="popupFormAddPhoto"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <Input
      id="placeName"
      className="popup__input popup__input_type_place-name"
      minLength={2}
      maxLength={30}
      name="name"
      placeholder="Название"
      value={placeName}
      onChange={handlePlaceNameChange}
    />

    <Input
      id="pictureUrl"
      className="popup__input popup__input_type_picture-url"
      minLength={2}
      maxLength={300}
      name="link"
      placeholder="Ссылка на картинку"
      value={placeUrl}
      onChange={handlePlaceUrlChange}
    />

    <SubmitButton>Создать</SubmitButton>
  </PopupWithForm>
  );
}

export default AddPlacePopup;
