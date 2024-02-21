import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Usuarios from './Usuarios';
import Produtos from './Produtos';
import './styles.css';
import Marcas from './Marcas';
import Ancora from './DadosAncora';
import PostBling from './PostBling';
import Fornecedor from 'pages/Catalogo/Routes';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <Route path="/catalogo/fornecedores">
            <Fornecedor/>
          </Route>
          <Route path="/admin/marca">
            <Marcas/>
          </Route>
          <Route path="/admin/usuarios">
            <Usuarios/>
          </Route>
          <Route path="/admin/dados-ancora">
            <Ancora/>
          </Route>
          <Route path="/admin/post-bling">
            <PostBling/>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;