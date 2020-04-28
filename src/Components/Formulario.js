import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error'
import useMoneda from '../hooks/useMoneda';
import useCriptomenda from '../hooks/useCriptomonedas';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px; 
    font-weight: bold; 
    font-size: 20px; 
    padding: 10px; 
    background-color: #66a2fe; 
    border: none; 
    width: 100%; 
    border-radius: 10px; 
    color: #fff; 
    transition: background-color .3s ease; 

    &:hover { 
        background-color: #326AC0; 
        cursor: pointer; 
    }
`;

const Formulario = ({guardarMoneda ,guardarCriptomoneda}) => {
    
    const [listado, guardarCriptomonedas] = useState([])
    const [error, guardarError] = useState(false)
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de EU'}, 
        {codigo: 'MXN', nombre: 'Peso Mexicano'}, 
        {codigo: 'EUR', nombre: 'Euro'}, 
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ] 

    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS); 
    const [criptomoneda, SelectCripto] = useCriptomenda('Elige tu Criptomoneda', '', listado);

    
    useEffect(() => {
        const consultarAPI = async () => { 
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resutaldo = await axios.get(url)
            guardarCriptomonedas(resutaldo.data.Data)
        } 
        consultarAPI();
    }, [])

    // poenr la funcion 
    const cotizarMoneda = (e) => { 
        e.preventDefault();
        if(moneda === '' || criptomoneda ===''){
            guardarError(true); 
            return;
        }

        guardarError(false);
        // pasamos las dos
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error 
                        mensaje='Todos los campos son obligatorios' /> 
                    : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton 
                type="submit"
                value="calcular"
            />
            
        </form>
     );
}
export default Formulario;