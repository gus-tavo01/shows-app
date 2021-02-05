import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import ShowTypes from './constants/showTypes';
// Components
import AppMenu from './components/AppMenu';
import Home from './pages/Home';
import Shows from './pages/Shows';
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
          <Route path="/mas-populares">
            <Shows title="Mas populares" type={ShowTypes.popular} />
          </Route>
          <Route path="/mejor-valorados">
            <Shows type={ShowTypes.rated} title="Mejor valorados" />
          </Route>
          <Route path="/viendo-ahora">
            <Shows type={ShowTypes.trending} title="Lo que se esta viendo" />
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
