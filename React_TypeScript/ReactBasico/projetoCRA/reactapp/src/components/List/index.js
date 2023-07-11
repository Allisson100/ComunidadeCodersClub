import {  useState, useCallback, useMemo } from "react";

const set = new Set()

export default function List () {

    const [contador, setContador] = useState(1)

    const handleSetContador = useCallback(() => {
        setContador((oldContador) => oldContador + 1)
        set.add(handleSetContador)
    }, [])

    const number = useMemo(() => 16151651651 * 1615616516516, [])
    
    
    console.log(set.size)
    console.log(number);

    return (
    <div>
        Contador: {contador}
        <button onClick={handleSetContador}>
            Aumenta Contador
        </button>
    </div>
    )
}