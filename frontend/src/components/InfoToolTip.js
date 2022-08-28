import React from "react";

function InfoTooltip({ isOpen, image, message, onClose }) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img className="popup__image" alt="успешно" src={image} />
        <p className="popup__text">{message}</p>
        <button className="popup__close" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
