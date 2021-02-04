import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import AppMenu from './components/AppMenu';
import Home from './pages/Home';
import ShowsList from './pages/ShowsList';
import ShowDetails from './pages/ShowDetails';
import NotFound from './pages/NotFound';
import ShowTypes from './constants/showTypes';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <AppMenu />
        </header>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/most-popular">
            <ShowsList type={ShowTypes.popular} />
          </Route>
          <Route path="/most-rated">
            <ShowsList type={ShowTypes.topRated} />
          </Route>
          <Route path="/trending">
            <ShowsList type={ShowTypes.trending} />
          </Route>
          <Route path="/details/:id">
            <ShowDetails />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
