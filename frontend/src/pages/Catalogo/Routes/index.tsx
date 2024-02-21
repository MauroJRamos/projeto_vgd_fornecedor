import { Route, Switch } from "react-router-dom";
import Form from "../Form";





const Fornecedor = () => {

    return (
        <Switch>
            <Route path="/catalogo/fornecedores/:fornecedorId">
                <Form/>
            </Route>
        </Switch>
    )
}

export default Fornecedor;