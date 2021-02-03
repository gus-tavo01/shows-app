import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import AppMenu from './components/AppMenu';
import Home from './pages/Home';
import ShowsList from './pages/ShowsList';
import ShowDetails from './pages/ShowDetails';
import NotFound from './pages/NotFound';

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
            <ShowsList />
          </Route>
          <Route path="/most-rated">
            <div><h2>Most rated shows</h2></div>
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
