import React, {useState} from 'react'
export default function Calculadora() {
    function Suma(){
      let a = document.getElementById('NumeroSuma1').value;
      console.log(a);
      let b = document.getElementById('NumeroSuma2').value;
      console.log(b);
      let c = parseInt(a)+parseInt(b);
      // let c = a+b;
      console.log(c);
      document.getElementById('ResultadoSuma').value = c;
      return c;
    }
    function Resta(){
      let a = document.getElementById('NumeroResta1').value;
      console.log(a);
      let b = document.getElementById('NumeroResta2').value;
      console.log(b);
      let c = parseInt(a)+parseInt(b);
      // let c = a+b;
      console.log(c);
      document.getElementById('ResultadoResta').value = c;
      return c;
    }
    function Multiplicacion(){
      let a = document.getElementById('NumeroMultiplicacion1').value;
      console.log(a);
      let b = document.getElementById('NumeroMultiplicacion2').value;
      console.log(b);
      let c = parseInt(a)+parseInt(b);
      // let c = a+b;
      console.log(c);
      document.getElementById('ResultadoMultiplicacion').value = c;
      return c;
    }
    function Division(){
      let a = document.getElementById('NumeroDivision1').value;
      console.log(a);
      let b = document.getElementById('NumeroDivision2').value;
      console.log(b);
      let c = parseInt(a)+parseInt(b);
      // let c = a+b;
      console.log(c);
      document.getElementById('ResultadoDivision').value = c;
      return c;
    }
  return (
    <div>
        <br></br>
        <div>
        <label>Sumar</label>
        <br></br>
        <input placeholder='0' id='NumeroSuma1'></input>
        <label>+</label>
        <input placeholder='0' id='NumeroSuma2'></input>
        <br></br>
        <a class="btn btn-primary" onClick={Suma}>Sumar</a>
        <input id='ResultadoSuma'></input>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <label>Restar</label>
        <br></br>
        <input placeholder='0' id='NumeroResta1'></input>
        <label>-</label>
        <input placeholder='0' id='NumeroResta2'></input>
        <br></br>
        <a class="btn btn-primary" onClick={Resta}>Restar</a>
        <input id='ResultadoResta'></input>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <label>Multiplicar</label>
        <br></br>
        <input placeholder='0' id='NumeroMultiplicacion1'></input>
        <label>*</label>
        <input placeholder='0' id='NumeroMultiplicacion2'></input>
        <br></br>
        <a class="btn btn-primary" onClick={Multiplicacion}>Multiplicar</a>
        <input id='ResultadoMultiplicacion'></input>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <label>Dividir</label>
        <br></br>
        <input placeholder='0' id='NumeroDivision1'></input>
        <label>/</label>
        <input placeholder='0' id='NumeroDivision2'></input>
        <br></br>
        <a class="btn btn-primary" onClick={Division}>Dividir</a>
        <input id='ResultadoDivision'></input>
      </div>
    </div>
  )
}
