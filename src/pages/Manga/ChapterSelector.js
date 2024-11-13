import Cookies from 'js-cookie';
import Manga1 from '../img/MierukoManga.webp'

const SelectorChapter = () => {

    const userLogged = Cookies.get('Username');

    if (userLogged === undefined){
      alert("Debe iniciar sesion antes de continuar");
      window.location.replace('http://localhost:3000/login')
    }
return(
<>
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seleccionar Capítulos</title>
  <link
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    rel="stylesheet"
  />
 <div className="container mt-5">
  
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <img
            src={Manga1}
            className="card-img-top"
            alt="Manga Critica"
          />
          <div className="card-body">
            <h5 className="card-title">Manga nuevo</h5>
            <p className="card-text">Mieruko ve fantasmas y así.</p>
          
          </div>
        </div>
      </div>
      {/* Más mangas en tarjetas */}
    </div>
  </div>
  <div className="container mt-5">
    <h1 className="mb-4">Seleccionar Capítulo</h1>
    <div className="list-group mb-4">
      <a href="#" className="list-group-item list-group-item-action">
        Capítulo 1: El Comienzo
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Capítulo 2: La Aventura
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Capítulo 3: El Desafío
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Capítulo 4: La Batalla
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Capítulo 5: La Resolución
      </a>
    </div>
    <h2 className="mb-4">Comentarios</h2>
    <form>
      <div className="form-group">
        <label htmlFor="nombreUsuario">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombreUsuario"
          placeholder="Ingresa tu nombre"
        />
      </div>
      <div className="form-group">
        <label htmlFor="comentarioUsuario">Comentario</label>
        <textarea
          className="form-control"
          id="comentarioUsuario"
          rows={3}
          placeholder="Escribe tu comentario"
          defaultValue={""}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  </div>
</>

</>


)




}

export default SelectorChapter;