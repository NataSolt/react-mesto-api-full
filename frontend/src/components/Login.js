import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="form__popup">
      <div className="form__container">
        <h2 className="form__title">Вход</h2>
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
          <button className="form__submit form__submit-login" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
