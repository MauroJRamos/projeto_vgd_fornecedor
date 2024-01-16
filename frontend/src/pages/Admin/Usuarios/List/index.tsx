import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import  UsuarioFiltro, { UserFilterData } from 'components/UserFiltro';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { Usuario } from 'types/usuario';
import './styles.css';
import UserCrudCard from '../UserCrudCard';



type ControlComponentsData = {
  activePage: number;
  filterData: UserFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Usuario>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
     filterData: { nomUsuario: '', },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
    
  };

  const handleSubmitFilter = (data: UserFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });   
  };

  const getUsuarios = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/usuario',
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        nomUsuario: controlComponentsData.filterData.nomUsuario,
      },
    };

      requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/usuarios/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <UsuarioFiltro onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="row">
        {page?.content.map((usuario) => (
          <div key={usuario.id} className="col-sm-6 col-md-12">
            <UserCrudCard usuario={usuario} onDelete={getUsuarios} />
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