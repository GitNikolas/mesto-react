const Card = ({ card, onCardClick}) => {

    function handleClick() {
    onCardClick(card);
  }

  return (
    <>
      <button className="photo-card__delete" aria-label="Удалить" type="button" ></button>
      <img className="photo-card__image" src={card.link} alt={card.name} role="button" onClick={handleClick} />
      <div className="photo-card__title">
        <h2 className="photo-card__text">{card.name}</h2>
        <button className="photo-card__like" aria-label="Мне нравится" type="button" ></button>
        <p className="photo-card__like-counter">{card.likes.length}</p>
      </div>
    </>
  )
}

export default Card;
