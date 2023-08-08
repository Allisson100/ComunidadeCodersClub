# Aprendendo Redux moderno com o Toolkit

É a maneira recomendada de trabalhar com redux hoje em dia.

Criamos um projeto simples apenas com um contador:

    import { useState } from "react";
    import Contador from "../../components/Contador";

    export default function Main () {

        const [count , setCount] = useState(0)

        function aumentar () {
            setCount((prevCount) => {
                return prevCount + 1
            })
        }

        function dimunuir () {
            setCount((prevCount) => {

                if(prevCount === 0) {
                    return 0
                }

                return prevCount - 1
            })
        }

        function resetar () {
            setCount(0)
        }

        return (
            <div>
            <h1>CoderClub RTK</h1>
            <p>
                    Vamos aprender como implmentar a última versão do Redux, utilizando o Redux Toolkit e Typescript
                </p>
                <button onClick={aumentar}>Aumentar</button>
                <button onClick={dimunuir}>Diminuir</button>
                <button onClick={resetar}>Resetar</button>
                <Contador
                    countValue={count}
                />
            </div>
        )
    }

### Começando o projeto

Vamos começar instalando:

    yarn add @reduxjs/toolkit react-redux

Vamos começar a fazer a estrutura do projeto, começando criando a pasta store dentro de src e dentro da pasta store o arquivo index.ts.

A nomenclatura desse novo modo do redux não é mais modules e sim slices.

Então dentro da pasta store vamos criar uma pasta chamada slices e dentro dela uma pasta chamada counter e dentro dela o arquivo index.ts

O arquivo index.ts do counter fica:

    import { createSlice } from "@reduxjs/toolkit";

    const counterSlice = createSlice({
        name: '@counter',
        initialState: {
            value: 0,
        },
        reducers: {
            incrementCounter: (draft) => {
                draft.value += 1
            },
            decrementCounter: (draft) => {
                if(draft.value ) {
                    draft.value -= 1
                }
            },
            resetCounter: (draft) => {
                draft.value = 0
            }
        }
    })

    export const {decrementCounter , incrementCounter , resetCounter} = counterSlice.actions

    export const counterReducer = counterSlice.reducer;

Primeiro ressaltar que estamos usando o nome draft e não state, pois era uma prática no redux saga quando utilizamos o immer.

O código é semelhante ao de antigamente porém muito mais simples e fácil de entender.

Agora temos que configurar a store, no arquivo index.ts da store fica:

    import { configureStore } from "@reduxjs/toolkit/dist/configureStore";

    import { counterReducer } from "./slices/counter";

    export const store = configureStore({
        reducer: {
            counter: counterReducer,
        }
    })

Agora só precisamos tipar, vamos criar uma pasta dentro da pasta slices chamada types e dentro dessa pasta um arquivo chamado index.ts e nele digitamos:

    import { store } from "../..";

    export type ReduxStore = ReturnType<typeof store.getState>

    export type AppDispatch = typeof store.dispatch

Agora precisamos utilizar o Provider lá no App, então no arquivo App.tsx do app fica assim:

    import Main from './pages/Main'
    import { store } from './store'
    import GlobalStyles from './styles/global'
    import { Provider } from 'react-redux'

    function App() {

        return (
            <Provider store={store}>
            <GlobalStyles />
            <Main />
            </Provider>
        )
    }

    export default App

E no arquivo index do Contador fica:

    import { ReduxStore } from '../../store/slices/types';
    import { ContadorContainer } from './styles'
    import { useSelector } from 'react-redux/es/exports';

    function Contador () {

        const counter = useSelector<ReduxStore>(state => state.counter.value)

        return (
            <ContadorContainer>
                {`${counter}`.padStart(2,'0')}
            </ContadorContainer>
        )
    }

    export default Contador

Para nós termos uma experiência de desenvolvimento melhor, vamos criar um custom hook para a questão da tipagem do <ReduxStore>. Então vamos criar uma pasta dentro de scr chamada hooks e dentro dela um arquivo index.ts, dentro da pasta hooks vamos criar outra pasta chamada useReduxSelector com um arquivo index.ts dentro dele e nesse arquivo digitamos:

    import { useSelector , TypedUseSelectorHook } from 'react-redux'
    import { ReduxStore } from '../../store/slices/types'

    export const useReduxSelector: TypedUseSelectorHook<ReduxStore> = useSelector

Agora no arquivo index.ts dentro da pasta hooks digitamos:

    export * from './useReduxSelector'

E no nosso arquivo index do contador fica assim:

    import { useReduxSelector } from '../../hooks';
    import { ContadorContainer } from './styles'

    function Contador () {

        const counter = useReduxSelector(state => state.counter.value)

        return (
            <ContadorContainer>
                {`${counter}`.padStart(2,'0')}
            </ContadorContainer>
        )
    }

    export default Contador

E da mesma forma vamos agora tipar o dispatch, então vamos criar uma pasta dentro de hooks chamada useReduxDispatch com um arquivo index.ts dentro dele e digitamos:

    import { useDispatch } from 'react-redux'
    import { AppDispatch } from '../../store/slices/types'

    export const useReduxDispatch = () => useDispatch<AppDispatch>()

E temos que importar isso no arquivo index principal dos hooks:

    export * from './useReduxDispatch'
    export * from './useReduxSelector'

Agora precisamos implementar nossas ações no arquivo index da página Main:

    import Contador from "../../components/Contador";
    import { useReduxDispatch } from "../../hooks";
    import { decrementCounter, incrementCounter, resetCounter } from "../../store/slices/counter";

    export default function Main () {

        const dispatch = useReduxDispatch()

        const increment = () => dispatch(incrementCounter())
        const decrement = () => dispatch(decrementCounter())
        const reset = () => dispatch(resetCounter())

        return (
            <div>
            <h1>CoderClub RTK</h1>
            <p>
                    Vamos aprender como implmentar a última versão do Redux, utilizando o Redux Toolkit e Typescript
                </p>
                <button onClick={increment}>Aumentar</button>
                <button onClick={decrement}>Diminuir</button>
                <button onClick={reset}>Resetar</button>
                <Contador />
            </div>
        )
    }

Basicamente criamos funções chamando as actions e com isso alteramos o valor do counter.

Fizemos apenas coisas simples nesse projeto. Agora vamos ver como passar payloader para essas actions.

No arquivo index do Main vamos criar outro botão:

    const randomIncrement = () => null
    <button onClick={randomIncrement}>Random Increment</button>

Por enquanto o valor será null.

No nosso arquivo index.ts do counter fica assim:

    import { createSlice , PayloadAction } from "@reduxjs/toolkit";

    const counterSlice = createSlice({
        name: '@counter',
        initialState: {
            value: 0,
        },
        reducers: {
            incrementCounter: (draft) => {
                draft.value += 1
            },
            randomIncrementCounter: (draft, action: PayloadAction<number>) => {
                if(draft.value < 99) {
                    draft.value += action.payload
                }
            },
            decrementCounter: (draft) => {
                if(draft.value ) {
                    draft.value -= 1
                }
            },
            resetCounter: (draft) => {
                draft.value = 0
            }
        }
    })

    export const {decrementCounter , incrementCounter , resetCounter} = counterSlice.actions

    export const counterReducer = counterSlice.reducer;

E agora no index do Main fica assim:

    const randomIncrement = () => dispatch(randomIncrementCounter(2))

Dessa forma vai aumentar de dois em dois o contador, podemos também criar uma função com Math.random(). Tipamos a action desse modo PayloadAction<number>.

Podemos fazer essa parte de payload assim também:

    const randomIncrement = () => dispatch(randomIncrementCounter({value: 2}))

    randomIncrementCounter: (draft, action: PayloadAction<{value: number}>) => {
        if(draft.value < 99) {
            draft.value += action.payload.value
        }
    },

Dessa forma passamos um payload como objeto e é dessa forma agora que conseguimos passar o payload e tipar ele de maneira mais simples.

Existe algumas discussões sobre performance em relação ao Selector, uma das formas de melhorar a performance é utilizar o useCllback():

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

Tabém podemos utilizar outro conceito que é criando uma pasta chamada reducers, mas isso vai muito de equipe para equipe.

Basicamente criamos uma pasta chamada selectores e dentro dela um arquivo chamado index.ts e nele digitamos:

    import { ReduxStore } from '../../../types'

    export const selectCounterValue = (state: ReduxStore) => state.counter.value

E ao invés de fazer isso no Contador:

    const counter = useReduxSelector(
        useCallback((state) => state.counter.value, [])
    )

Vamos fazer isso:

import { useSelector } from 'react-redux'

    const counter = useSelector(selectCounterValue)

Como dessa forma não é uma função inline e não vai precisar ser recriada, vamos ter um ganho de otimização.
