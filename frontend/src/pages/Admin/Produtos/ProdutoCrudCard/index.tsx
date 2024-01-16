import './styles.css';
import { formatPrice } from "util/format";
import { Produto } from 'types/produto';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type Props = {
  product: Produto;
  onDelete: Function;
};

const ProductCrudCard = ({ product, onDelete }: Props) => {

  const handleDelete = (productId: number) => {

    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/produto/${productId}`,
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
              <th scope="row">Nome Produto</th>
              <th scope="row">Desc Produto</th>
              <th scope="row">Valor Ancora</th>
              <th scope="row">Estoque</th>
              <th scope="row">Codigo</th>
              <th scope="row">Valor Venda</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td>{product.nomProduto}</td>
                <td>{product.dscProduto}</td>
                <td>{formatPrice (product.vlrPrecoAncora)}</td>
                <td>{product.qtdEstoque}</td>
                <td>{product.codProduto}</td>
                <td>{formatPrice (product.vlrPrecoVenda)}</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div className="product-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(product.id)}
          className="btn btn-outline-danger product-crud-card-button product-crud-card-button-first"
        >
            EXCLUIR
        </button>
        <Link to={`/admin/produtos/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCrudCard;