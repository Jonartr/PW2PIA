import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from '../img/Hinata.png'
import Formregister from '../Components/Formregister';

const Register = () => {

return(
    <section className="bg-primary py-3 py-md-5 py-xl-8">
    <div className="container">
      <div className="row gy-4 align-items-center">
        <div className="col-12 col-md-6 col-xl-7">
          <div className="d-flex justify-content-center text-bg-primary">
            <div className="col-12 col-xl-9">
              <img
                className="img-fluid rounded mb-4"
                loading="lazy"
                src={Image}
                width={245}
                height={80}
                alt="Logo Mangas UwU"
              />
              <h2 className="h1 mb-4">
                Únete a nuestra comunidad y sumérgete en mundos llenos de
                aventuras.
              </h2>
              <hr className="border-primary-subtle mb-4" />
              <p className="lead mb-5">Opiniones sinceras, mangas fascinantes.</p>
              <div className="text-endx">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={48}
                  height={48}
                  fill="currentColor"
                  className="bi bi-grip-horizontal"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-xl-5">
          <div className="card border-0 rounded-4">
            <div className="card-body p-3 p-md-4 p-xl-5">
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <h3>Crear una nueva cuenta</h3>
                    <p>
                      Ya tienes una cuenta? <a href="Login.html">Inicia sesión</a>
                    </p>
                    <Formregister></Formregister>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  

);


};

export default Register;