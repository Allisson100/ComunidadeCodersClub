import Contador from "../../components/Contador";
import { useReduxDispatch } from "../../hooks";
import { decrementCounter, incrementCounter, randomIncrementCounter, resetCounter } from "../../store/slices/counter";


export default function Main () {

    const dispatch = useReduxDispatch()

    const increment = () => dispatch(incrementCounter())
    const decrement = () => dispatch(decrementCounter())
    const reset = () => dispatch(resetCounter())

    const randomIncrement = () => dispatch(randomIncrementCounter({value: 2}))

    return (
        <div>
           <h1>CoderClub RTK</h1>
           <p>
                Vamos aprender como implmentar a última versão do Redux, utilizando o Redux Toolkit e Typescript
            </p>
            <button onClick={increment}>Aumentar</button>
            <button onClick={decrement}>Diminuir</button>
            <button onClick={reset}>Resetar</button>
            <button onClick={randomIncrement}>Random Increment</button>
            <Contador />
        </div>
    )
}