import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../img/Tomo1.jpg';
import Cookies from 'js-cookie';


const Incoming = () =>{
  const userLogged = Cookies.get('Username');

  if (userLogged === undefined){
    alert("Debe iniciar sesion antes de continuar");
    window.location.replace('http://localhost:3000/login')
  }
  

return(
<>
  <div className="container">
    <h1>Proximamente.</h1>
    <div className="row">
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
          <img
              className="img-fluid rounded mb-4"
              loading="lazy"
              src={Image}
              width={245}
              height={80}
              alt="Logo Mangas UwU"
            />
            <h5 className="card-title">Mieruko Chan</h5>
            <p className="card-text">Género: Terror, Comedia.</p>
       
            <p className="card-text">Fecha de estreno: 22 de octubre de 2024 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
)

}


export default Incoming;