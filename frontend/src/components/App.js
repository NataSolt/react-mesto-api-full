import React from "react";
import { apiCards } from "../utils/api";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import DeletedPopup from "./DeletedPopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../contexts/currentUserContext";
import { register, login, checkToken } from "../utils/auth";
import imageError from "../images/error.png";
import imageSuccess from "../images/success.png";
import InfoTooltip from "./InfoToolTip";

function App() {
  //user
  const [currentUser, setCurentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCard, setDeleteCard] = React.useState(null);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [message, setMessage] = useState("");
  const history = useHistory();

  //Регистрация пользователя
  function onRegister(email, password) {
    register(email, password)
      .then(() => {
        //Попап успешной регистрации
        setInfoTooltipImage(imageSuccess);
        setMessage("Вы успешно зарегистрировались!");
        setInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setInfoTooltipImage(imageError);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  //Вход пользователя
  function onLogin(email, password) {
    login(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
        }
      })
      .catch((err) => {
        setInfoTooltipImage(imageError);
        setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        console.log(`Ошибка ${err}`);
      });
  }

  //проверка токена
  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res.data) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((arr) => alert(arr));
    }
  }

  useEffect(() => {
    tokenCheck();
  });

  //Выход из системы, удаляем токен
  function logoutProfile() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  useEffect(() => {
    if (loggedIn) {
      apiCards
        .getUsers()
        .then((result)=> {
          setCurentUser(result.data)
        })
        .catch((arr) => alert(arr));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      apiCards
        .getCards()
        .then((result) => {
          setCards(result.data);
        })
        .catch((arr) => alert(arr));
    }
  }, [loggedIn]);

  function handleUpdateUser(data) {
    apiCards
      .patchUsers(data)
      .then((result) => {
        setCurentUser(result);
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleUpdateAvatar(avatar) {
    apiCards
      .patchAvatar(avatar)
      .then((result) => {

        setCurentUser(result);
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleAddPlaceSubmit(card) {
    apiCards
      .postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк
    const isLiked = card.likes.some((i) => i === currentUser._id);
    apiCards
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) =>(c._id === card._id ? newCard : c))
      );
      })
      .catch((arr) => alert(arr));
  }

  function handleCardDelete(card) {
    setDeleteCard(card);
  }

  function handleDeleteCard() {
    const cardId = deleteCard._id;
    apiCards
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((arr) => alert(arr));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeleteCard(null);
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onSignOut={logoutProfile}
          />
          {/* <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />  */}
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />

            <Route exact path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>

            <Route exact path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />
          <DeletedPopup
            isOpen={deleteCard}
            onClose={closeAllPopups}
            onConfirm={handleDeleteCard}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

          <InfoTooltip
            isOpen={infoTooltipOpen}
            onClose={closeAllPopups}
            image={infoTooltipImage}
            message={message}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
