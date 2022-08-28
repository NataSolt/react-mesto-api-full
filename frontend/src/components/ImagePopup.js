import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup-img ${props.name} ${
        props.card ? "popup_opened" : ""
      }`}
    >
      <div className="popup-img__container">
        <img
          src={props.card && props.card.link}
          alt={props.card && props.card.name}
          className="popup-img__photo"
        />
        <p className="popup__img-caption">{props.card && props.card.name}</p>
        <button
          className="popup-img__close popup__close"
          type="button"
          aria-label="крест отмена"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
