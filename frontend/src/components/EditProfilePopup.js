import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/currentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      user: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__lable">
        <input
          type="text"
          className="popup-profile__text popup-profile__text_type_name popup-input"
          placeholder="пользователь"
          name="user"
          id="input-name"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error input-name-error"></span>
      </label>
      <label className="popup__lable">
        <input
          type="text"
          className="popup-profile__text popup-profile__text_type_job popup-input"
          id="input-job"
          placeholder="вид деятельности"
          name="about"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__input-error input-job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
