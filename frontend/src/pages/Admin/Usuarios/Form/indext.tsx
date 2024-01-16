import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { Usuario } from 'types/usuario';
import { useForm } from 'react-hook-form';
import './styles.css';



type UrlParams = {
  usuarioId: string;
};


const Form = () => {

  const { usuarioId } = useParams<UrlParams>();

  const isEditing = usuarioId !== 'create';

  const history = useHistory();


 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    //control,
  } = useForm<Usuario>();

  

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/usuario/${usuarioId}` }).then((response) => {
        const usuario = response.data as Usuario;

        setValue('id', usuario.id);
        setValue('nom_usuario', usuario.nom_usuario);
        setValue('ativo_inativo', usuario.ativo_inativo);
        setValue('dat_cadastro', usuario.dat_cadastro);
       

      });
    }
  }, [isEditing, usuarioId, setValue]);

  const onSubmit = (formData: Usuario) => {
   
    
    const data = {
      ...formData,
      
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/usuario/${usuarioId}` : '/usuario',
      data,
    };

    requestBackend(config)
    .then(() => {
      toast.info('Produto cadastrado com sucess');
      history.push('/admin/usuarios');
    })
    .catch(() => {
      toast.error('Erro ao cadastrar produto');
    });
  };


  const handleCancel = () => {
    history.push('/admin/usuarios');
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
                  {...register('id', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.id ? 'is-invalid' : ''
                  }`}
                  placeholder="Codigo Usuario"
                  name="id"
                />
                <div className="invalid-feedback d-block">
                  {errors.id?.message}
                </div>
              </div>

              <div className="margin-bottom-30 ">
              <input
                  {...register('nom_usuario', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.nom_usuario ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome Usuario"
                  name="nom_usuario"
                />
                <div className="invalid-feedback d-block">
                  {errors.nom_usuario?.message}
                </div>
              </div>

              

              
              
         
            </div>
            <div className="col-lg-6">
              <div className="margin-bottom-30">
               <input
                  {...register('ativo_inativo', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.ativo_inativo ? 'is-invalid' : ''
                  }`}
                  placeholder="Situação"
                  name="ativo_inativo"
                />
                <div className="invalid-feedback d-block">
                  {errors.ativo_inativo?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('dat_cadastro', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.dat_cadastro ? 'is-invalid' : ''
                  }`}
                  placeholder="Data Cadastro"
                  name="dat_cadastro"
                />
                <div className="invalid-feedback d-block">
                  {errors.dat_cadastro?.message}
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