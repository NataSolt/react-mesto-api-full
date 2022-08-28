import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
}, [props.isOpen])

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      place: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="popup-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      disabled={props.state}
    >
      <label className="popup__lable">
        <input
          type="text"
          className="popup-card__text popup-card__text_type_title popup-input"
          id="input-place"
          placeholder="Название"
          name="place"
          minLength="2"
          maxLength="30"
          onChange={handleChangeName}
          value={name}
          required
        />
        <span className="input-place-error popup__input-error"></span>
      </label>
      <label className="popup__lable">
        <input
          type="url"
          className="popup-card__text popup-card__text_type_link popup-input"
          id="input-url"
          placeholder="Ссылка на картинку"
          name="link"
          onChange={handleChangeLink}
          value = {link}
          required
        />
        <span className="popup__input-error input-url-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
