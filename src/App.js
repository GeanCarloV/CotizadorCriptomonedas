import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './Components/Formulario';
import Cotizacion from './Components/Cotizacion';

import axios from 'axios';
import Spinner from './Components/Spinner';

const Contenedor = styled.div`
  max-width: 900px; 
  margin: 0 auto; 
  @media (min-width:992px) { 
    display: grid; 
    grid-template-columns: repeat(2, 1fr); 
    column-gap: 2 rem;
  }
`;
const Imagen = styled.img`
  max-width: 100%; 
  margin-top: 5rem; 
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive; 
  color: #FFF; 
  text-align: left; 
  font-weight: 700; 
  font-size: 50px; 
  margin-bottom: 50px; 
  margin-top: 80px; 
  &::after { 
    content: ''; 
    display: block;
    width: 100px; 
    height: 6px; 
    background-color: #66A2FE;

  }

`;


function App() {
  
  const [moneda, guardarMoneda] = useState(''); 
  const [criptomeneda, guardarCriptomoneda] = useState(''); 
  const [resultado, guardarResutaldo] = useState({});
  // state que se muestre el spinner 
  const [cargando, guardarCargando] = useState(false)


  useEffect(()=>{ 
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return; 

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomeneda}&tsyms=${moneda}`; 

      const resultado = await axios.get(url)
      // en esta parte se muestra el spines 
      guardarCargando(true);

      // oculaptamos el spinnes y mostrsr el erstualdo
      setTimeout(() => { 
        // cambiamos el estado del cotizacion 
        guardarCargando(false); 


        // gauramdos la coizaccion 
        guardarResutaldo(resultado.data.DISPLAY[criptomeneda][moneda]);

      }, 3000)
      
  
    }

    cotizarCriptomoneda();

  }, [moneda, criptomeneda]);

  // mostarr spinner o resutaldo , de manera condicional
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>

      <div>
        <Heading>Cotiza Criptomonedas al Instante </Heading>
        <Formulario
          guardarMoneda ={guardarMoneda}
          guardarCriptomoneda = {guardarCriptomoneda}
        ></Formulario>
        
        {componente}

      </div>
    </Contenedor>

  );

}

export default App;
