import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductFilter, { ProductFilterData } from 'components/ProdutoFiltro';
import ProdutoCrudCard from 'pages/Admin/Produtos/ProdutoCrudCard';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Produto } from 'types/produto';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: ProductFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Produto>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
     filterData: { codigo: '', },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
    
  };

  const handleSubmitFilter = (data: ProductFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });   
  };

  const getProducts = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/produto',
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        codigoId: controlComponentsData.filterData.codigo,
      },
    };

      requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/produtos/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <ProductFilter onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="row">
        {page?.content.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-12">
            <ProdutoCrudCard product={product} onDelete={getProducts} />
          </div>
        ))}
      </div>
      <Pagination  forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange} />
    </div>
  );
};

export default List;