import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Catalogo from "pages/Catalogo";
import history from "util/history";
import Admin from "pages/Admin";
import Form from "pages/Catalogo/Form";

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/fornecedores" exact>
        <Catalogo />
      </Route>
      <Route path="/fornecedores/:fornecedorId" exact>
        <Form />
      </Route>
      <Redirect from="/admin" to="/admin/fornecedores" exact />
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
