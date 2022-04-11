import { Route, Routes } from 'react-router-dom';
import { HeaderNav, HeaderTabs } from './components';
import { routes } from './helpers';
import './Css/App.scss';

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
