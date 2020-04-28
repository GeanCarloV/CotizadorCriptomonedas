import React, { Fragment, useState} from 'react';
import styled from '@emotion/styled'


const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff; 
    text-transform: uppercase; 
    font-weight: bold; 
    font-size: 2.4rem;
    margin-top: block;  
`;
const Select = styled.select`
    width: 100%; 
    display: block; 
    padding: 1rem; 
    -webkit-appearance: none; 
    border-radius: 10px; 
    border: none; 
    font-size: 1.2rem; 
`


const useCriptomenda = (label, stateInicial, criptosApi) => {
    
    const [state, actualizarState] = useState(stateInicial); 

    const SelectCripto = () => (
        <Fragment> 
            <Label> {label} </Label>
            <Select
                onChange={ e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccionar Criptomoneda --</option>
                {criptosApi.map(criptosmone => (
                    <option key={criptosmone.CoinInfo.Id} value={criptosmone.CoinInfo.Name}>{criptosmone.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    ); 

    return [state, SelectCripto, actualizarState]; 

}   
export default useCriptomenda; 