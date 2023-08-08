import { useCallback } from 'react';
import { useReduxSelector } from '../../hooks';
import { ContadorContainer } from './styles'

function Contador () {

    const counter = useReduxSelector(
        useCallback((state) => state.counter.value, [])
    )

    return (
        <ContadorContainer>
            {`${counter}`.padStart(2,'0')}
        </ContadorContainer>
    )
}

export default Contador