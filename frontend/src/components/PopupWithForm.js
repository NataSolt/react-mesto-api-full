import React from "react";

function PopupWithForm(props) {
 
  return (
    <section
      className={`popup ${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container ">
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.popupName}
          className="popup-form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__submit">
            {props.buttonText}
          </button>
        </form>
        <button className="popup__close" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
