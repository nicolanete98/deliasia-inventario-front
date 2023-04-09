import { NavLink,Link } from "react-router-dom";

export const Navbar = ({isAuth}) => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-md-top`}>
        <Link className="navbar-brand" 
                to="/">
            <img width="150" src="/ORIGINAL.png" alt="" /> 
            <h4>Inventario</h4>
        </Link>        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse mt-md-3 mt-lg-2 d-lg-flex flex-lg-row-reverse me-lg-5" id="navbarNav">
            <div className="navbar-nav fs-5">
              <NavLink  
                className={ ({ isActive }) => `nav-item nav-link ${ isActive ? 'active' : '' } ` }
                to="/Movimientos" end>
                Movimientos
            </NavLink>
            <NavLink 
                className={ ({ isActive }) => `nav-item nav-link ${ isActive ? 'active' : '' }` }
                to="/Productos" >
                Productos
            </NavLink>
            <NavLink 
                className={ ({ isActive }) => `nav-item nav-link ${ isActive ? 'active' : '' }` }
                to="/Recetas" >
                Recetas
            </NavLink>
            <NavLink 
                className={ ({ isActive }) => `nav-item nav-link ${ isActive ? 'active' : '' }` }
                to="/PrecioVenta" >
                PrecioVenta
            </NavLink>
            <NavLink 
                className={ ({ isActive }) => `nav-item nav-link ${ isActive ? 'active' : '' }` }
                to="/Compras" >
                Compras
            </NavLink>
            <NavLink 
                className={ ({ isActive }) => `nav-item nav-link ${ isActive ? 'active' : '' }` }
                to="/Ventas" >
                Ventas
            </NavLink>
            </div>
          </div>
 
    </nav>
  )
}
