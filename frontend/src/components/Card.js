import React from "react";
import CurrentUserContext from "../contexts/currentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которая используется при удалении
  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? "card__trash_visible" : "card__trash_hidden"
  }`;
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : " "
  }`;

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img
        alt={props.card.name}
        onClick={handleClick}
        src={props.card.link}
        className="card__image"
      />
      <div className="card__group">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__container-likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="нравится"
            type="button"
          ></button>
          <span className="card__count-like">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        aria-label="корзина"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </article>
  );
}

export default Card;
