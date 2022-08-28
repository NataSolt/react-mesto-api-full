import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refAvatar = useRef("");

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      avatar: refAvatar.current.value,
    });
  }
  React.useEffect(() => {
    refAvatar.current.value = ""
}, [props.isOpen])

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__lable">
        <input
          id="input-src"
          type="url"
          name="avatar"
          className="popup-avatar__text popup-avatar__text_type_link popup-input"
          placeholder="Ссылка на изображение"
          ref={refAvatar}
          defaultValue=""
          required
        />
        <span className="popup__input-error input-src-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
