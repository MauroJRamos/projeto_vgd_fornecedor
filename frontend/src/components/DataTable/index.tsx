import axios from "axios";
import Pagination from "components/Pagination";
import ProdutoFiltro , { ProductFilterData } from "components/ProdutoFiltro";
import { useEffect, useState } from "react";
import { FornecedorPage } from "types/fornecedor";
//import { formatLocalDate, formatPrice } from "util/format";
import { BASE_URL } from "util/requests";


type ControlComponentsData = {
  activePage: number;
  filterData: ProductFilterData;
};


const DataTable = () => {
 // const dataAtual = new Date();
  

  //const [activePage, setActivePage] = useState(0);
  const [page, setPage] = useState<FornecedorPage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { codigo: '', pathCidade:''}
    });

  const handleSubmitFilter = (data: ProductFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });   
  };

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData});
  };

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/fornecedor?page=${controlComponentsData.activePage}&size=12&sort=dscFornecedor&categoria=${controlComponentsData.filterData.codigo}&pathCidade=${controlComponentsData.filterData.pathCidade}`
      )
      .then((response) => {
        setPage(response.data);
        
      });
  }, [ controlComponentsData]); //

  //const changePage = (index: number) => {
  // setActivePage(index);
 // };

  
 

  return (
    <>
      <div className="product-crud-bar-container">
        <ProdutoFiltro onSubmitFilter={handleSubmitFilter}/>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-md ">
          <thead>
            <tr>
              <th scope="row">Fornecedor</th>
              <th scope="row">Email</th>
              <th scope="row">Data Solicitação</th>
              <th scope="row">Retorno</th>
              <th scope="row">Tentativa</th>
              <th scope="row">Retorno02</th>
              <th scope="row">Contato</th>
              <th scope="row">Contato02</th>
              <th scope="row">Contato03</th>
              <th scope="row">Categoria</th>
              <th scope="row">Cidade Pasta</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map((item) => (
              <tr key={item.id}>
                <td>{item.dscFornecedor}</td>
                <td>{item.dscEmail}</td>
                <td>{item.dscDataSolicitacao}</td>
                <td>{item.dscRetorno01}</td>
                <td>{item.dsctentativa01}</td> 
                <td>{item.dscRetorno02}</td>
                <td>{item.dscContato01}</td>
                <td>{item.dscContato02}</td>
                <td>{item.dscContato03}</td>
                <td>{item.dscCategoria}</td>
                <td>{item.dscPathCidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination  forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange} />
    </>
  );
};

export default DataTable;
