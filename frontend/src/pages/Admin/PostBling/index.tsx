
import DataTableBling from 'components/DataTableBling';
import './styles.css';


const PostBling = () => {
  

  return (
    <div className="container my-4  base-card">
      <div className="row">
            <div className="row datatable-container" >
              <DataTableBling/>
            </div>
        
      </div>
    </div>
  );
};

export default PostBling;