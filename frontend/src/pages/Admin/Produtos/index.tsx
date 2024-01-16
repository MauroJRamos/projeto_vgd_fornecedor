import { Route, Switch } from "react-router-dom";

import List from './List';
import Form from "./Form/indext";


const Products = () => {

    return (
        <Switch>
            <Route path="/admin/produtos" exact>
                <List />
            </Route>
            <Route path="/admin/produtos/:productId">
                <Form />
            </Route>
        </Switch>
    )
}

export default Products;