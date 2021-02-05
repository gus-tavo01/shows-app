import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
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
          <Route path="/mas-populares">
            <ShowsList type={ShowTypes.popular} pageTitle="Mas populares" />
          </Route>
          <Route path="/mejor-valorados">
            <ShowsList type={ShowTypes.rated} pageTitle="Mejor valorados" />
          </Route>
          <Route path="/viendo-ahora">
            <ShowsList type={ShowTypes.trending} pageTitle="Lo que se esta viendo" />
          </Route>
          <Route path="/shows/:id/detalles">
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
