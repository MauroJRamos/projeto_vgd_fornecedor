import { NavLink } from "react-router-dom";
import "./styles.css";
import "@popperjs/core";
import "bootstrap/js/dist/collapse";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav ">
      <div className="container-fluid">
        <NavLink to="/" activeClassName="active" exact>
          <a href="link" className="nav-logo-text">
            <h4>Sistema Fonecedor</h4>
          </a>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/fornecedores" activeClassName="active">
                CATÁLOGO
              </NavLink>
            </li>
            <li>
            <NavLink to="/admin/fornecedores" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
