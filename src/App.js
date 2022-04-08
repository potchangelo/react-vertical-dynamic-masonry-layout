import './Css/App.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { HeaderNav, HeaderTabs } from './Component';
import { routeArray } from './Helper';

function App() {
  const routeElements = routeArray.map(route => {
    const { url, component } = route;
    return <Route key={uuidv4()} path={url} element={component} />;
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
