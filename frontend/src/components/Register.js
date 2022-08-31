import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {

const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="form__popup">
      <div className="form__container">
        <h2 className="form__title">Регистрация</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form__input"
            name="email"
            type="email"
            onChange={handleEmailChange}
            placeholder="Email"
            required
          />
          <input
            className="form__input"
            name="password"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Пароль"
            required
          />
          <button className="form__submit form__submit-register" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="form__block">
          <p className="form__paragraph">Уже зарегистрированы? </p>
          <Link className="form__signin" to="/signin">
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
