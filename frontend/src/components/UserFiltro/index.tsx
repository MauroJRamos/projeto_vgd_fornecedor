
import { useForm } from 'react-hook-form';

import './styles.css';

export type UserFilterData = {
  nomUsuario: string;
};

type Props = {
  onSubmitFilter: (data: UserFilterData) => void;
};



const UsuarioFiltro = ({ onSubmitFilter }: Props) => {

  const { register, handleSubmit, setValue } =
  useForm<UserFilterData>();

const onSubmit = (formData: UserFilterData) => {
  onSubmitFilter(formData);
};

const handleFormClear = () => {
  setValue('nomUsuario','');
};



  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
           {...register('nomUsuario')}
            type="text"
            className="form-control"
            placeholder="Nome do Usuario"
            name="nomUsuario"
          />
           <button className='product-filter-search-icon'>
            Source
           </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            
          </div>
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-product-filter-clear"
          >
            LIMPAR<span className="btn-product-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioFiltro;