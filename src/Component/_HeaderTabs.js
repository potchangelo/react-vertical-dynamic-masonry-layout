import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../Helper';

function HeaderTabs() {
  function getNavClass(navLinkProps) {
    let navClass = 'header-tabs__item';
    if (navLinkProps.isActive) navClass += ' is-selected';
    return navClass;
  }

  const tabElements = routes.map((route, index) => {
    const { id, url, title } = route;
    return (
      <NavLink key={id} to={url} className={getNavClass} end>
        {title}
      </NavLink>
    );
  });

  return (
    <header className="header-tabs">
      <div className="header-tabs__scroll-area">
        <div className="header-tabs__items">{tabElements}</div>
      </div>
    </header>
  );
}

export default HeaderTabs;
