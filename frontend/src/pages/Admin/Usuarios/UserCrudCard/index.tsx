import './styles.css';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Usuario } from 'types/usuario';

type Props = {
  usuario: Usuario;
  onDelete: Function;
};

const UserCrudCard = ({ usuario, onDelete }: Props) => {

  const handleDelete = (usuarioId: number) => {

    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/usuario/${usuarioId}`,
    };

    requestBackend(config).then(() => {
      onDelete();
    });
  };

  return (
    <div className="base-card product-crud-card">
        <div className="table-responsive">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="row">Id</th>
              <th scope="row">Nome Usuario</th>
              <th scope="row">Situação</th>
              <th scope="row">Data Cadastro</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td>{usuario.id}</td>
                <td>{usuario.nom_usuario}</td>
                <td>{usuario.ativo_inativo}</td>
                <td>{usuario.dat_cadastro}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className="product-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(usuario.id)}
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-first"
        >
            EXCLUIR
        </button>
        <Link to={`/admin/usuarios/${usuario.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCrudCard;