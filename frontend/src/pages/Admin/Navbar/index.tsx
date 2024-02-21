import { NavLink } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul className="admin-nav-items-container">
        <li>
          <NavLink to="/admin/produtos" className="admin-nav-item">
            <p>Fonecedores</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/usuarios" className="admin-nav-item">
            <p>Usuários</p>
          </NavLink>
        </li>
    
      </ul>
    </nav>
  );
};

export default Navbar;
