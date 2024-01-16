import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Catalogo from "pages/Catalogo";
import history from "util/history";
import Admin from "pages/Admin";

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/produtos" exact>
        <Catalogo />
      </Route>
      <Redirect from="/admin" to="/admin/produtos" exact />
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
