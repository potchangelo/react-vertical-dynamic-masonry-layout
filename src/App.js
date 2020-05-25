import './Css/App.scss';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { HeaderNav, HeaderTabs } from './Component';
import { routeArray } from './Helper';

function App() {
	const routeElements = routeArray.map(route => {
		const { url, component } = route;
		if (url === '/') {
			return (
				<Route key={uuidv4()} exact path={url}>
					{component}
				</Route>
			);
		}
		return (
			<Route key={uuidv4()} path={url}>
				{component}
			</Route>
		);
	});

	return (
		<div className="app">
			<HeaderNav />
			<HeaderTabs />
			<Switch>
				{routeElements}
			</Switch>
		</div>
	);
}

export default App;