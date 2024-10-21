import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../img/Tomo1.jpg'

const Destacados = () =>{
return(
<>
  <div className="container">
    <h1>Lo más destacado.</h1>
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
            <p className="card-text">
              Descripción: Miko es una estudiante común, 
              pero su vida cambia drásticamente por un suceso terrible e inesperado: 
              ¡de pronto comienza a ver espectros espantosos en todas partes! 
              Y aunque muere de horror cada vez que sucede, 
              decide fingir que no los percibe porque teme que la lastimen si se percatan de que puede verlos. 
              ¡Acompáñala en sus intentos de vivir como una chica normal!
            </p>
            <p className="card-text">Fecha de publicacion: 2 de noviembre de 2018 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
)

}


export default Destacados;