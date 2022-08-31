import logoHeader from '../images/logo-header.svg';
import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

function Header({loggedIn, userEmail, onSignOut}) {
    return ( 
        <header className="header">
        <img
          src={logoHeader}
          alt="надпись на английском языке место Россия"
          className="header__logo"
        />
       
       {!loggedIn &&
                <>
                <Switch>
                    {<Route path="/signup">
                        <Link to="/signin" className="header__link">Войти</Link>
                    </Route>}
                    {<Route path="/signin">
                        <Link to="/signup" className="header__link">Регистрация</Link>
                    </Route>}
                    </Switch>
                </>
            }
            

            <Route exact path="/">
                <div className="header__nav">
                    <p className="header__email">{userEmail}</p>
                    <div className="header__link header__link_out" onClick={onSignOut} >Выйти</div>
                </div>
                </Route>
      </header>

    )}

    export default Header;
