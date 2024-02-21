import { useHistory, useParams } from 'react-router-dom';
import { Fornecedor } from 'types/fornecedor';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';


import './styles.css';




type UrlParams = {
 fornecedorId:string;
};


const Form = () => {

  const {fornecedorId} = useParams<UrlParams>();

  const isEditing = fornecedorId !== 'create';

  const history = useHistory();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  
  } = useForm<Fornecedor>();


  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/fornecedor/${fornecedorId}` }).then((response) => {
        const fornecedor = response.data as Fornecedor;

        setValue('dscFornecedor', fornecedor.dscFornecedor);
        setValue('dscEmail', fornecedor.dscEmail);
        setValue('dscDataSolicitacao', fornecedor.dscDataSolicitacao);
        setValue('dscRetorno01', fornecedor.dscRetorno01);
        setValue('dsctentativa01', fornecedor.dsctentativa01);
        setValue('dscRetorno02', fornecedor.dscRetorno02);
        setValue('dscContato01', fornecedor.dscContato01);
        setValue('dscContato02', fornecedor.dscContato02);
        setValue('dscContato03', fornecedor.dscContato03);
        setValue('dscCategoria', fornecedor.dscCategoria);
        setValue('dscPathCidade', fornecedor.dscPathCidade);


      });
    }
  }, [isEditing, fornecedorId, setValue]);

  const onSubmit = (formData: Fornecedor) => {
   
    //função que converte virgula ',' para ponto '.'
    const data = {
      ...formData,
     //vlrPrecoAncora: String(formData.vlrPrecoAncora).replace(',', '.'),
     };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/fornecedor/${fornecedorId}` : '/fornecedor',
      data,
    };

    requestBackend(config)
    .then(() => {
      toast.info('Fornecedor cadastrado com sucess');
      history.push('/fornecedores');
    })
    .catch(() => {
      toast.error('Erro ao cadastrar Fornecedor');
    });
  };


  const handleCancel = () => {
    history.push('/fornecedores');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO FORNECEDOR</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                 <input
                  {...register('dscFornecedor', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscFornecedor ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do fornecedor"
                  name="dscFornecedor"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscFornecedor?.message}
                </div>
              </div>

              <div className="margin-bottom-30 ">
              <input
                  {...register('dscEmail', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscEmail ? 'is-invalid' : ''
                  }`}
                  placeholder="Email do fornecedor"
                  name="dscEmail"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscEmail?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
              <input
                  {...register('dscDataSolicitacao', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscDataSolicitacao? 'is-invalid' : ''
                  }`}
                  placeholder="Data Solicitação"
                  name="dscDataSolicitacao"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscDataSolicitacao?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
              <input
                  {...register('dscRetorno01', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscRetorno01 ? 'is-invalid' : ''
                  }`}
                  placeholder="Retorno01"
                  name="dscRetorno01"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscRetorno01?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dsctentativa01', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dsctentativa01 ? 'is-invalid' : ''
                  }`}
                  placeholder="tentativa 01"
                  name="dsctentativa01"
                />
                <div className="invalid-feedback d-block">
                  {errors.dsctentativa01?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dscRetorno02', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscRetorno02 ? 'is-invalid' : ''
                  }`}
                  placeholder="Retorno 02"
                  name="dscRetorno02"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscRetorno02?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="margin-bottom-30">
               <input
                  {...register('dscContato01', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscContato01 ? 'is-invalid' : ''
                  }`}
                  placeholder="dscContato01"
                  name="dscContato01"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscContato01?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dscContato02', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscContato02 ? 'is-invalid' : ''
                  }`}
                  placeholder="Contato02"
                  name="dscContato02"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscContato02?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dscContato03', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscContato03 ? 'is-invalid' : ''
                  }`}
                  placeholder="Contato 03"
                  name="dscContato03"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscContato03?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dscCategoria', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscCategoria ? 'is-invalid' : ''
                  }`}
                  placeholder="Categoria"
                  name="dscCategoria"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscCategoria?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dscPathCidade', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscPathCidade ? 'is-invalid' : ''
                  }`}
                  placeholder="Pasta/Cidade"
                  name="dscPathCidade"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscPathCidade?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;