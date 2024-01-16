import { Route, Switch } from "react-router-dom";

import List from './List';
import Form from "./Form/indext";

const Usuarios = () => {
  return (
    <Switch>
        <Route path="/admin/usuarios" exact>
            <List />
        </Route>
        <Route path="/admin/usuarios/:usuarioId">
            <Form/>
        </Route>
    </Switch>
)
} 
  export default Usuarios;