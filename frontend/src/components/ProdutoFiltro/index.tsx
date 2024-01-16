
import { useForm } from 'react-hook-form';

import './styles.css';

export type ProductFilterData = {
  codigo: string;
  pathCidade?: string;
};

type Props = {
  onSubmitFilter: (data: ProductFilterData) => void;
};



const ProdutoFiltro = ({ onSubmitFilter }: Props) => {

  const { register, handleSubmit, setValue } =
  useForm<ProductFilterData>();

const onSubmit = (formData: ProductFilterData) => {
  onSubmitFilter(formData);
};

const handleFormClear = () => {
  setValue('codigo','');
  setValue('pathCidade', '');
};



  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
           {...register('codigo')}
            type="text"
            className="form-control"
            placeholder="Categoria"
            name="codigo"
          />
          <input
           {...register('pathCidade')}
            type="text"
            className="form-control"
            placeholder="Nome Cidade"
            name="pathCidade"
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

export default ProdutoFiltro;