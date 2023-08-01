# Dominado Redux com SAGA

Para começar vamos adicionar os pcotes para utilizar o redux:

    yarn add redux react-redux redux-saga
    yarn add @types/react-redux @types/redux-saga --dev

A estruuta de pasta costuma ser a seguinte:

Dentro de src criamos uma pasta chamada store, dentro da pasta store vamos ter uma divisão de módulos ou features, nosso caso vamos chamar de modules e dentro dessa pasta vamos ter outras pastas com cada um de nosso módulos, no nosso caso vamos chamar de authy, pois estamos fazendo uma página de autenticação.

Dentro da pasta auth vamos ter alguns arquivos e esses arquivos contumam se repetir em cenários diferentes, primeiro arquivo:

- actions.ts, digitamos:

  function signInRequest() {
  return {
  type: 'SIGN_IN_REQUEST', // Único valor obrigatório
  payload: {

            }
        }

  }

Apenas o type é obrigatório, pois tem casos por exemplo, SING_OUT_REQUEST, que só com esse tipo conseguimos fazer um clear no local storage sem precisarmos do payload.

    export function signInRequest({ email , password }: { email: string; password: string }) {
        return {
            type: 'SIGN_IN_REQUEST', // Único valor obrigatório
            payload: {
                email,
                password,
            }
        }
    }

Nossa action é basicamente uma função que pode ou não receber parâmetros e que vai retornar sempre um tipo e se precisar um payload que vão ser as informações dos parâmetros que vamos repassar posteriormente. Uma boa prática para não ter conflitos de actions é dar o nome da action referente ao contexto, no nosso caso @auth, pois duas actions com o mesmo type vai ocasionar em um bug.

Segundo arquivo:

- reducer.ts

Depois de uma action temos o dispatch, que basicamente vai pegar os nossos dados e colocá-los na store, mas temos o reducer que vai filtrar esse dados, então no arquivo reducer.ts digitamos:

    function auth(state, action) {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                return {
                    ...state,
                    loadingSignInRequest: true,
                }

            default:
                break;
        }
    }

Ele segue essa estrutra padrão. É comum retornar sempre uma cópia do nosso estado, que no caso é uma cópia do estado atual antes de ser modificado (...state).

    const initialState = {
        loadingSignInRequest: false,
        isSignedIn: false,
    }

    export function auth(state = initialState, action) {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                return {
                    ...state,
                    loadingSignInRequest: true,
                }

            default:
                return state;
        }
    }

Precisamos agora tipar as variáveis, para isso costumamos ter um arquivo de tipos, que é o nosso terceiro arquivo:

- types.ts, e nele digitamos:

  export interface AuthState {
  readonly loadingSignInRequest: boolean;
  readonly isSignedIn: boolean;
  }

Para tipar a action vamos utlizar o :AnyAction, mas para ter uma inteligencia melhor lá no código vamos utilziar uma biblioteca e para isso digitamos:

    yarn add typesafe-actions

Então nosso arquivo types.ts fica da seguinte forma:

    import { ActionType }from 'typesafe-actions'
    import * as actions from './actions'

    export type AuthActions = ActionType<typeof actions>

    export interface AuthState {
        readonly loadingSignInRequest: boolean;
        readonly isSignedIn: boolean;
    }

Nosso reducer.ts fica assim:

    import { AuthActions, AuthState } from "./types";

    const initialState: AuthState = {
        loadingSignInRequest: false,
        isSignedIn: false,
    }

    export function auth(state = initialState, action: AuthActions): AuthState {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                return {
                    ...state,
                    loadingSignInRequest: true,
                }

            default:
                return state;
        }
    }

Porém nosso código está funcionando porque temos apenas uma action, mas quando precisarmos adcionar mais vai começar a ter conflitos por conta dessa nossa biblioteca que acabamos de instalar e para isso temos que fazer uma alteração no nosso arquivo actions.ts, ficando assim:

    import { action } from "typesafe-actions/dist/action";

    export function signInRequest({ email , password }: { email: string; password: string }) {
        return action('@auth/SIGN_IN_REQUEST', {
                    email,
                    password,
                })
    }

Basicamente de vez mandar um objeto que nem antes, estamos utilzando a função action() da biblioteca que instalamos e passamos para ela dois parâmetro que são o type da action e o payload caso precise.

Dessa forma podemos configurar nossa Store, não configuramos antes, pois precisamos de pelo menos de uma função de reducer para configurá-la certinho.

Agora dentro da pasta modules vamos criar um arquivo chamado rootReducer.ts e nele digitamos:

    import { combineReducers } from 'redux'

    import authReducer from './auth/reducer'

    export combineReducers({
        auth: authReducer,
    })

Podemos simplificar dessa maneira:

    import { combineReducers } from 'redux'

    import auth from './auth/reducer'

    export default combineReducers<StoreState>({
        auth,
    })

Dessa forma a gente combina todos os reducer e conforme for criando mais reducer é só ir exportando e ir adiconando nesse arquivo.

Agora dentro da pasta store vamos criar o arquivo createStore.ts e nele digitamos:

    import { applyMiddleware, createStore } from 'redux'

    export default (reducers, middlewares) => {
        const enhancer = applyMiddleware(... middlewares)

        return createStore(reducers , enhancer)
    }

Agora precisamos tipar isso, ficando dessa forma:

    import { Middleware, Reducer, applyMiddleware, createStore } from 'redux'
    import { AuthActions } from './modules/auth/types'

    export interface StoreState {
        auth: AuthState;
    }

    export type StoreAction = AuthActions;

    export default (reducers: Reducer<StoreState , StoreAction>, middlewares: Middleware[]) => {
        const enhancer = applyMiddleware(... middlewares)

        return createStore(reducers , enhancer)
    }

Agora vamos criar um arquivos dentro da pasta store chamado index.ts, ele vai ser o arquivo responsável por chamar a função do arquivo createStore.ts, então nele digitamos:

    import createStore from "./createStore.ts";
    import rootReducer from "./modules/rootReducer.ts";

    const store = createStore(rootReducer, [])

    export { store }

E no nosso arquivo App.tsx precisamos adicionar o Provider:

    import { Provider } from 'react-redux'
    import styled from './global.module.css'
    import { store } from './store'

    function App() {

        return (
            <Provider store={store}>
            <div className={styled.container}>
                <h1>LOGO</h1>
                <input type="text"  placeholder='Email'/>
                <input type="password" placeholder='senha'/>
                <button>Entrar</button>
            </div>
            </Provider>
        )
    }

    export default App

Dessa maneira o core da nossa estrutura do redux fica correta e precisamos agora só configurar o Middleware que no nosso caso será o Saga.

Vale lembrar que toda essa configuração nós precisamos fazer apenas uma vez, então não é necessário ficar muito preucupado em decorar isso, o importante é sempre ter um projeto para usar como base e te ajudar.

### Pegando os dados do setup

Vamos em algum componente do projeto, vou usar um componente pra testar.

Vamos importar o useSelector que vai nos ajudar a buscar nossas informações lá na store e o useDispatch vai nos ajudar a enviar informações para nossa store.

    import { useSelector , useDispatch } from 'react-redux'
    import { StoreState } from '../../store/createStore.ts'

    function Teste () {

        const { isSignedIn } = useSelector((state: StoreState) => state.auth)
        console.log(isSignedIn);

        return (
            <div>
                <h1>TESTE</h1>
            </div>
        )
    }

    export default Teste

Criei um componente para teste e dessa forma com o useSelector conseguimos utilizar alguma variável de nossa action.

Código final:

    import { useSelector , useDispatch } from 'react-redux'
    import { StoreState } from '../../store/createStore.ts'
    import { signInRequest } from '../../store/modules/auth/actions.ts';

    function Teste () {

        const { loadingSignInRequest } = useSelector((state: StoreState) => state.auth)
        const dispatch = useDispatch()

        console.log('LOADING: ', loadingSignInRequest);

        return (
            <div>
                <h1>TESTE</h1>
                <button onClick={() => dispatch(signInRequest({ email: 'teste@gmail.com' , password: '123456' }))}>testeBT</button>
            </div>
        )
    }

    export default Teste

Utilizamos a const { loadingSignInRequest } com o useSelector para obtermos o valor dessa variável que definimos no initial state no arquivo reducer.ts.

Depois usamos o dispatch() fazer a chamada para a action mas precisamos colocá-la em uma constante:

    const dispatch = useDispatch()

No evento de onClick do botão chamamos esse dispatch e passsamos como parâmetro a função que criamos na action:

import { action } from "typesafe-actions";

    export function signInRequest({ email , password }: { email: string; password: string }) {
        return action('@auth/SIGN_IN_REQUEST', {
                    email,
                    password,
                })
    }

Dentro dessa função passamos o emial e o password como parâmetros.

No nosso arquivo reducer.ts:

    import { AuthActions, AuthState } from "./types";

    const initialState: AuthState = {
        loadingSignInRequest: false,
        isSignedIn: false,
    }

    export default function auth(state = initialState, action: AuthActions): AuthState {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                return {
                    ...state,
                    loadingSignInRequest: true,
                }

            default:
                return state;
        }
    }

Ele tem função de ficar ouvindo esse action como se fosse eventListener, e nesse caso chamamo a action através do botão, o reducer ouviu e fez o switch case e nesse caso pedimos para trocar o valor da variável loadingSignInRequest de false para true e dessa forma conseguimos mudar o valor de uma variável.

Um pouco complexo então vou ter que estudar mias depois.

### Adicionando o Redux Saga na aplicação

Vamos criar a action do Saga agora. No arquivo action.ts adicionamos a seguinte action:

    export function signInSuccess({ token }: { token: string }) {
        return action('@auth/SIGN_IN_SUCCESS', {
                    token,
                })
    }

Pesquisar sobre generators javaScript.

E agora dentro da pasta auth vamos criar nosso quarto arquivo chamado sagas.ts.

Promisses ou generators a gente resolve utilizando a call ou put.

Vamos criar outra action para caso nossa requisição dar erro:

    export function signInFailure() {
        return action('@auth/SIGN_IN_FAILURE')
    }

Dentro do arquivo sagas.ts digitamos:

    import { takeLatest , call , put , all } from 'redux-saga/effects'
    import { ActionType, } from 'typesafe-actions'
    import * as actions from './actions'

    import api from '../../../services/api'

    export function* signIn({ payload }: ActionType<typeof actions.signInRequest>) {
        try {
            const { email , password } = payload

            const { data } = yield call(api.post, '' , { email , password })

            yield put(actions.signInSuccess({ token: data.token }))

        } catch (err) {
            yield put(actions.signInFailure())
        }
    }

    export default all([
        takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    ])

O takeLatest sempre vai pegar a última vez que aquela action foi disparada .
Temos também o takeEvery que vai pegar todas as actions, exemplo o chat de mensagem, se o usuário está pasando vris mensagens muito rapido, nós queremos pegar todas elas e não apenas a última.

Agora vamos criar um arquivo dentro da pasta modules chamado rootSaga.ts ele vai fazer a mesma coisa que o rootReducer fez, vai pegar tdos os sagas de nossos modules. Então nele digitamos:

    import auth from './auth/sagas'
    import { all } from 'redux-saga/effects'

    export default function* rootSaga() {
        yield all([auth])
    }

E no nosso arquivo index.ts vamos fazer a configuração desse middleware Saga, então nele digitamos:

    import createSagaMiddleware from 'redux-saga'
    import { Middleware } from 'redux'

    import createStore from "./createStore.ts";
    import rootReducer from "./modules/rootReducer";
    import rootSaga from './modules/rootSaga';

    const sagaMiddleware = createSagaMiddleware()

    const middlewares: Middleware[] = [sagaMiddleware]

    const store = createStore(rootReducer, middlewares)

    sagaMiddleware.run(rootSaga)

    export { store }

No nosso caso a requisição vai falhar, mas não tem problema. Precisamos agora ir no reducer.ts e colcoar outro case lá, então o arquivo fica:

    import { AuthActions, AuthState } from "./types";

    const initialState: AuthState = {
        loadingSignInRequest: false,
        isSignedIn: false,
        error: false,
    }

    export default function auth(state = initialState, action: AuthActions): AuthState {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST':
                return {
                    ...state,
                    loadingSignInRequest: true,
                }
            case '@auth/SIGN_IN_SUCCESS':
                return {
                    ...state,
                    loadingSignInRequest: false,
                    isSignedIn: true,
                }
            case '@auth/SIGN_IN_FAILURE':
                return {
                    ...state,
                    loadingSignInRequest: false,
                    error: true,
                }

            default:
                return state;
        }
    }

Adicionamos uma propriedade nova chamada error e precisamos tipar ela também , então no arquivo types.ts:

    import { ActionType }from 'typesafe-actions'
    import * as actions from './actions'

    export type AuthActions = ActionType<typeof actions>

    export interface AuthState {
        readonly loadingSignInRequest: boolean;
        readonly isSignedIn: boolean;
        readonly error: boolean;
    }

No nosso componente Teste:

    import { useSelector , useDispatch } from 'react-redux'
    import { StoreState } from '../../store/createStore.ts'
    import { signInRequest } from '../../store/modules/auth/actions.ts';

    function Teste () {

        const { loadingSignInRequest , error } = useSelector((state: StoreState) => state.auth)
        const dispatch = useDispatch()

        console.log('LOADING: ', loadingSignInRequest);
        console.log('Error: ', error);

        return (
            <div>
                <h1>TESTE</h1>
                <button onClick={() => dispatch(signInRequest({ email: 'teste@gmail.com' , password: '123456' }))}>testeBT</button>
            </div>
        )
    }

    export default Teste

Nossa variável de error está funcionando corretamente.

### Estudar

- Estudar sobre Redux persist(biblioteca).
- redux devtools(extensão)
- immer(biblioteca)
