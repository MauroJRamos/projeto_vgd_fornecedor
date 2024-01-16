import { useHistory, useParams } from 'react-router-dom';
import { Produto } from 'types/produto';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { Marca } from 'types/marca';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';


import './styles.css';
import Select from 'react-select';


type UrlParams = {
  productId: string;
};


const Form = () => {

  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const history = useHistory();

 const [selectMarcas, setSelectMarcas] = useState<Marca[]>([]);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  
  } = useForm<Produto>();

  useEffect(() => {
   requestBackend({ url:'/marca' }).then((response) => {
      setSelectMarcas(response.data.content);
   });
  }, []);

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/produto/${productId}` }).then((response) => {
        const produto = response.data as Produto;

        setValue('nomProduto', produto.nomProduto);
        setValue('codProduto', produto.codProduto);
        setValue('dscProduto', produto.dscProduto);
        setValue('datAtualizacao', produto.datAtualizacao);
        setValue('vlrPrecoAncora', produto.vlrPrecoAncora);
        setValue('datCadastro', produto.datCadastro);
        setValue('vlrPrecoVenda', produto.vlrPrecoVenda);
        setValue('vlrAnoFabricacao', produto.vlrAnoFabricacao);
        setValue('ativoInativo', produto.ativoInativo);
        setValue('idtUsuarioCadastro', produto.idtUsuarioCadastro);
        setValue('marcaId', produto.marcaId);

      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Produto) => {
   
    //função que converte virgula ',' para ponto '.'
    const data = {
      ...formData,
      vlrPrecoAncora: String(formData.vlrPrecoAncora).replace(',', '.'),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/produto/${productId}` : '/produto',
      data,
    };

    requestBackend(config)
    .then(() => {
      toast.info('Produto cadastrado com sucess');
      history.push('/admin/produtos');
    })
    .catch(() => {
      toast.error('Erro ao cadastrar produto');
    });
  };


  const handleCancel = () => {
    history.push('/admin/produtos');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                 <input
                  {...register('nomProduto', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.nomProduto ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="nomProduto"
                />
                <div className="invalid-feedback d-block">
                  {errors.nomProduto?.message}
                </div>
              </div>

              <div className="margin-bottom-30 ">
              <input
                  {...register('dscProduto', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscProduto ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição do produto"
                  name="dscProduto"
                />
                <div className="invalid-feedback d-block">
                  {errors.dscProduto?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
              <input
                  {...register('datCadastro', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscProduto ? 'is-invalid' : ''
                  }`}
                  placeholder="Data Cadastro"
                  name="datCadastro"
                />
                <div className="invalid-feedback d-block">
                  {errors.datCadastro?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
              <input
                  {...register('qtdEstoque', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dscProduto ? 'is-invalid' : ''
                  }`}
                  placeholder="Qtd estoque"
                  name="qtdEstoque"
                />
                <div className="invalid-feedback d-block">
                  {errors.qtdEstoque?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('codProduto', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.codProduto ? 'is-invalid' : ''
                  }`}
                  placeholder="Codigo Produto"
                  name="codProduto"
                />
                <div className="invalid-feedback d-block">
                  {errors.codProduto?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('idtUsuarioCadastro', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.idtUsuarioCadastro ? 'is-invalid' : ''
                  }`}
                  placeholder="Id Usuari Atualização"
                  name="idtUsuarioCadastro"
                />
                <div className="invalid-feedback d-block">
                  {errors.idtUsuarioCadastro?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="margin-bottom-30">
               <input
                  {...register('datAtualizacao', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.datAtualizacao ? 'is-invalid' : ''
                  }`}
                  placeholder="Data Atualização"
                  name="datAtualizacao"
                />
                <div className="invalid-feedback d-block">
                  {errors.datAtualizacao?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('vlrPrecoAncora', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.vlrPrecoAncora ? 'is-invalid' : ''
                  }`}
                  placeholder="vlr Preco Ancora"
                  name="vlrPrecoAncora"
                />
                <div className="invalid-feedback d-block">
                  {errors.vlrPrecoAncora?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('vlrAnoFabricacao', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.vlrAnoFabricacao ? 'is-invalid' : ''
                  }`}
                  placeholder="vlr Ano Fabricação"
                  name="vlrAnoFabricacao"
                />
                <div className="invalid-feedback d-block">
                  {errors.vlrAnoFabricacao?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('vlrPrecoVenda', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.vlrPrecoVenda ? 'is-invalid' : ''
                  }`}
                  placeholder="vlr Preco Venda"
                  name="vlrPrecoVenda"
                />
                <div className="invalid-feedback d-block">
                  {errors.vlrPrecoVenda?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('ativoInativo', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.ativoInativo ? 'is-invalid' : ''
                  }`}
                  placeholder="Status"
                  name="ativoInativo"
                />
                <div className="invalid-feedback d-block">
                  {errors.ativoInativo?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                    <Select
                      options={selectMarcas}
                      classNamePrefix="product-crud-select"
                      getOptionLabel={(marca: Marca) => marca.nomMarca}
                      getOptionValue={(marca: Marca) =>
                        String(marca.id)}
                      
                    />
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