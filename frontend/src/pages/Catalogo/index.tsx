import DataTable from 'components/DataTable';
import './styles.css';

const Catalogo = () => {
  

  return (
    <div className="container my-4  base-card ">
      <div className="row">
            <div className="row datatable-container-new" >
              <DataTable/>
            </div>
        
      </div>
    </div>
  );
};

export default Catalogo;