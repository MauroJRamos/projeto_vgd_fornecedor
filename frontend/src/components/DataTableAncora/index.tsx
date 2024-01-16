import axios from "axios";
import Pagination from "components/Pagination";
import DadosAncoraFiltro , { DadosAncoraFilterData } from "components/DadosAncoraFiltro";
import { useEffect, useState } from "react";
import { AncoraPage} from "types/dadosAncora";
import { formatLocalDate, formatPrice } from "util/format";
import { BASE_URL } from "util/requests";


type ControlComponentsData = {
  activePage: number;
  filterData: DadosAncoraFilterData;
};


const DataTableAncora = () => {
  
  

  //const [activePage, setActivePage] = useState(0);
  const [page, setPage] = useState<AncoraPage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { dataInicio: '', dataFim: '' },
    });

  const handleSubmitFilter = (data: DadosAncoraFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });   
  };

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData});
  };

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/dados_ancora?page=${controlComponentsData.activePage}&size=12&sort=datRequest&dataInicio=${controlComponentsData.filterData.dataInicio}&dataFim=${controlComponentsData.filterData.dataFim}`
      )
      .then((response) => {
        setPage(response.data);
        
      });
  }, [ controlComponentsData]); 


  return (
    <>
      <div className="product-crud-bar-container">
        <DadosAncoraFiltro onSubmitFilter={handleSubmitFilter}/>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="row">Codigo</th>
              <th scope="row">Desc Produto</th>
              <th scope="row">Marca Produto</th>
              <th scope="row">vlr Produto</th>
              <th scope="row">Data Request</th>
             
            </tr>
          </thead>
          <tbody>
            {page.content?.map((item) => (
              <tr key={item.id}>
                <td>{item.codProduto}</td>
                <td>{item.dscProduto}</td>
                <td>{item.dscMarcaProduto}</td>
                <td>{formatPrice (item.vlrProduto)}</td>
                <td>{formatLocalDate(item.datRequest, "dd/MM/yyyy")}</td>
               
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

export default DataTableAncora;
