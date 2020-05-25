import React from 'react';
import { NavLink } from 'react-router-dom';
import { routeArray } from '../Helper';

function HeaderTabs() {
	const tabElements = routeArray.map((route, index) => {
		const { url, title } = route;
		return (
            <NavLink 
                key={`tab-${index}`} 
                exact
                to={url} 
                className="header-tabs__item"
                activeClassName="is-selected" >
                {title}
            </NavLink>
        );
	});

	return (
        <header className="header-tabs">
            <div className="header-tabs__scroll-area">
                <div className="header-tabs__items">
                    {tabElements}
                </div>
            </div>
        </header>
	);
}

export default HeaderTabs;