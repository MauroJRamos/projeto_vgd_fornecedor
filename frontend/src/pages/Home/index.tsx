import { ReactComponent as MainImage } from "assets/images/main-image.svg";
import ButtonIcon from "components/ButtonIcon";
import { Link } from 'react-router-dom';

import "./styles.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="base-card home-card">
        <div className="home-content-container">
          <div>
            <h1>Catálogo de Fornecedores</h1>
            <p>
              Fornecedores que serão consultados, na base de planilhas
            </p>
          </div>
          <div>
            <Link to="/fornecedores">
              <ButtonIcon text="Verificar o catalogo de fornecedores" />
            </Link>
          </div>
        </div>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
    </div>
  );
};

export default Home;
