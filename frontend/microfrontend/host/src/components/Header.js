import React, {lazy} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';

const LogoutButton = lazy(() => import('auth/LogoutButton').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

function Header({ email }) {

  return (
    <header className="header page__section">
      <img src={logoPath} alt="Логотип проекта Mesto" className="logo header__logo" />
      <Routes>
        <Route path="/signup" element={<Link className="header__auth-link" to="../signin">Войти</Link>} />
        <Route path="/signin" element={<Link className="header__auth-link" to="../signup">Регистрация</Link>} />
        <Route exact path="/" element={
          <div className="header__wrapper">
            <p className="header__user">{email}</p>
            <LogoutButton cssClass="header__logout"/>
          </div>
        } />
      </Routes>
    </header>
  )
}

export default Header;
