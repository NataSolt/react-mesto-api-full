import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletedPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onConfirm();
  }

  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены?"
      buttonText="Да"
      //onClose={closeAllPopups}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletedPopup;
