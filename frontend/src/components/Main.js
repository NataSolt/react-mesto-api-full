import React from "react";
import CurrentUserContext from "../contexts/currentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="container">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          {currentUser.avatar && (
            <img
              onClick={props.onEditAvatar}
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар профиля"
            />
          )}
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <div className="profile__name">{currentUser.name}</div>
            <button
              type="button"
              className="profile__add-button"
              aria-label="открытие формы редактирования имя и работы"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-card"
          aria-label="открытие формы добавления карточек"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards" aria-label="карточки">
        {props.cards.map((card) => (
          <Card
            card={card}
            //currentUser={userId}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
