import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Link ,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const userExist = Cookies.get('Username');
  const photo = Cookies.get('photo');
  const url = "http://localhost:3001/";
  console.log(userExist);
  console.log(url + photo);

  function logout() {
    Cookies.remove("Username");
    Cookies.remove("photo");
    window.location.reload();
  }

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    navigate(`/ByName?name=${query}`);
  };


  // if(userExist ==undefined){
  //     alert("No hay usuario loggeado")
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">CriticManga</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/New">Nuevos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Outstanding">Destacados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Incoming">Proximos lanzamientos</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page">Acerca De</a>
            </li>

            <li className="nav-item">
              {userExist ? (
                <>
                  {/* <img className = "nav-link rounded-circle" alt="profilephoto" src={'http://localhost:3001/' + photo} /> */}
                  <a className="nav-link">
                    {userExist}
                  </a>

                </>

              ) :
                (<Link className="nav-link" to="/Login">Login</Link>)
              }
            </li>

            <li className="nav-item">

              {userExist ? (
                <a className="nav-link" aria-current="page" onClick={logout}>Cerrar Sesión</a>
              ) :
                (<p></p>)
              }

            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearch}>
            <input className="form-control me-2" type="search" name="search" placeholder="Buscar" aria-label="Buscar" />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
