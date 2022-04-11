import React from 'react';
import { Link } from 'react-router-dom';

function HeaderNav() {
  return (
    <header className="header-nav">
      <Link to="/" className="header-nav__link">
        <h1 className="title is-5">React Pinterest Layout</h1>
        <h3 className="subtitle is-7">by Zinglecode</h3>
        <img className="header-nav__logo" src="/image/logo-light-64.png" alt="zinglecode" />
      </Link>
    </header>
  );
}

export default HeaderNav;
