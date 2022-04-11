import './Css/App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HeaderNav, HeaderTabs } from './Component';
import { routes } from './helpers';

function App() {
  const routeElements = routes.map(route => {
    const { id, url, component } = route;
    return <Route key={id} path={url} element={component} />;
  });

  return (
    <div className="app">
      <HeaderNav />
      <HeaderTabs />
      <Routes>{routeElements}</Routes>
    </div>
  );
}

export default App;
