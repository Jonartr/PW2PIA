import 'bootstrap/dist/css/bootstrap.min.css';
import Image from './img/Tomo1.jpg'

const Nuevo = () =>{

<>
  <div className="container">
    <h1>Mis Cómics Favoritos</h1>
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
            <h5 className="card-title">Cómic 1</h5>
            <p className="card-text">Género: Superhéroes</p>
            <p className="card-text">
              Descripción: Un emocionante cómic lleno de acción y aventuras.
            </p>
          </div>
        </div>
      </div>
      {/* Repite este bloque para los otros 4 cómics */}
      {/* ... */}
    </div>
  </div>
  {/* Agrega los scripts de Bootstrap (CDN) */}
</>


}


export default Nuevo;