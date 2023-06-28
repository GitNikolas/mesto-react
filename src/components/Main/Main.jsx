import React from "react";
import api from "../../utils/Api";
import Card from "../Card/Card";

const Main = ({ onEditAvatar,onEditProfile,onAddPlace, onCardClick}) => {

  const [userName, setuserName] = React.useState('');
  const [userDescription, setuserDescription] = React.useState('');
  const [userAvatar, setuserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInformation(), api.getInitialCards()])

    .then( ([dataUser, dataCard]) => {

      setuserName(dataUser.name);
      setuserDescription(dataUser.about);
      setuserAvatar(dataUser.avatar);

      setCards(dataCard);
      })
    .catch((err) => console.error(`Ошибка: ${err}`))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
          type="button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <h1 className="profile__name" >
            {userName}
          </h1>
          <p className="profile__status" >
            {userDescription}
          </p>
          <button
            aria-label="Редактировать профиль"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
        </div>
        <button
          aria-label="Добавить фотокарточку"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__list list-style">
          {cards.map((data) => {
            return (
              <li className="photo-card" key={data._id}>
                <Card card={data} onCardClick={onCardClick} />
              </li>
            )
          })
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
