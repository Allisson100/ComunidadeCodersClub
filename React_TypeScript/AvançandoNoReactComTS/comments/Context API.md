# Context API

Evitar o prop drilling.

Com a context API conseguimos compartilhar dados no React.

Vamos criar uma pasta contexts e dentro dela um arquivo chamado auth.tsx e nele digitamos:

Temos o Provider e Context. O Provider já utilizamos em um caso que foi o caso dos temas, basicamente o provider é uma tag que engloba tudo, como se fosse a tag pai e todas as variáveis que existe nele podemos utilizar em qualquer elemento filho, como nós fizemos na questão do tema.

E o contexto é um contexto específico que vamos utilizar agora.

    import { createContext } from "react";

    interface Props {
        children?: React.ReactNode;
    }

    interface AuthContextData {
        signed: boolean;
    }

    const initialContext = {
        signed: false,
    }

    const AuthContext = createContext<AuthContextData>(initialContext)

    function AuthProvider ({ children }: Props) {


        return (
            <AuthContext.Provider value={{ signed: true }}>
                {children}
            </AuthContext.Provider>
        )
    }

    export { AuthContext , AuthProvider }

Aqui basicamente nós criamos um contexto com a const AuthContext e depois criamos um Provider desse contexto que é onde nós vamos exportar as variável para os elementos filhos.

E também fizemos as tipagens com o typescript.

Dessa maneira ele ainda não está 100% útil, pois o valor do signed nós estamos passsando estáticamente, mas jájá vamos mudar isso.

Para utilzar esse Provider no arquivo App.tsx acrescentamos:

    return (
        <ThemeProvider theme={newTheme}>
            <AuthProvider>
                <Router>
                <GlobalStyles />
                <AppRoutes />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );

Mas pode acontecer de termos que usar varios Providers de contextos diferente e para evitar isso vamos fazer o seguinte. Vamos criar um arquivo dentro da pasta contexts chamado index.tsx e nele digitamos:

    import { AuthProvider } from "./auth";

    interface Props {
        children?: React.ReactNode;
    }


    export default function ContextProvider({ children }: Props) {
        return(
            <AuthProvider>
                {children}
            </AuthProvider>
        )
    }

Dessa forma separamos os Providers em um único arquivo mesmo contendo diversos provider e no arquivo App.tsx vai ficar assim:

    return (
        <ThemeProvider theme={newTheme}>
        <ContextProvider>
            <Router>
            <GlobalStyles />
            <AppRoutes />
            </Router>
        </ContextProvider>
        </ThemeProvider>
    );

Dessa forma podemos ter diversos providers, mas de uma maneira mais organizada.

Para utilizar a context, vamos no index da página SignIn e digitamos:

import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import { Container , Logo , Input , Button } from './styles'

function SignIn () {

    const {signed} = useContext(AuthContext)

    console.log(signed);


    return (

        ...

    )

}

export default SignIn

Nós utilizamos de um Hook chamado useContext para usar esse valor de signed e somente com isso já conseguimos utilizá-lo.

Agora como podemos mudar o valor dessa variável semelhante ao que acontece no Zustand. Para isso no arquivo auth.tsx digitamos:

    import { createContext , useState } from "react";

    interface Props {
        children?: React.ReactNode;
    }

    interface AuthContextData {
        signed: boolean;
        setSigned: (signed: boolean) => void;
    }

    const initialState = {
        signed: true,
        setSigned: () => {}
    }

    const AuthContext = createContext<AuthContextData>(initialState)

    function AuthProvider ({ children }: Props) {

        const [signed , setSigned] = useState(initialState.signed)

        return (
            <AuthContext.Provider value={{ signed , setSigned }}>
                {children}
            </AuthContext.Provider>
        )
    }

    export { AuthContext , AuthProvider }

Fizemos uma alteração no nome initialContext para initialState porque agora estamos utilizando o Hook de estado para ter a variável signed dinâmica e com isso passamos para o Provider tanto a variável signed para ser utilizado como a função que muda seu estado que á setSigned.

Agora vamos aumentar um pouco a complexibilidade do código e vamos intalar o axios com o comando:

    npm install axios @types/axios

Vamos agora criar um novo arquivo no pasta services chamado api.ts e nele digitamos:

    import axios from "axios";

    export default axios.create({
        baseURL: 'https://carloslevir.free.beeceptor.com',
    })

Essa baseURL é uma API fake só para nós utilizarmos aqui no projeto.

Dentro do arquivo auth.tsx eu chamei a api:

    async function signIn() {
        await api.post('/signin')
    }

    return (
        <AuthContext.Provider value={{ signed , setSigned , signIn }}>
            {children}
        </AuthContext.Provider>
    )

E claro que tipei corretamente, mas não coloquei ai em cima e também exportei essa função que chama a api.

Esse link da API fake não está funcionndo mias , então futuramente eu utilizo essa aulas em uma API que funcione.

De momento vou apenas deixar o código final aqui, mas essa questão da API atrapalhou um pouco:

Index da pagina SignIn:

    import { useContext } from 'react'
    import { AuthContext } from '../../contexts/auth'

    import { Container , Logo , Input , Button } from './styles'


    function SignIn () {

        const {signed , loading , signIn} = useContext(AuthContext)

        function handleSingIn() {
            signIn()
        }


        return (
            <Container>
                <Logo src='https://cdn-icons-png.flaticon.com/512/552/552250.png' alt="CL Logo" />
                <Input type="text" defaultValue="test@email.com"/>
                <Input type="password" defaultValue="12345678"/>
                <Button onClick={() => handleSingIn()}>
                    {loading ? 'Carregando' : 'Entrar'}
                </Button>
            </Container>
        )
    }

    export default SignIn

    auth.tsx :

    import { createContext , useState , useEffect } from "react";
    import api from "../services/api";

    interface Props {
        children?: React.ReactNode;
    }

    interface User {
        name: string
    }

    interface AuthContextData {
        signed: boolean;
        signIn: () => void;
        loading: boolean;
        user: User;
    }

    const initialState = {
        signed: true,
        signIn: () => {},
        loading: false,
        token: null,
        user: {
            name: ''
        },
    }

    const AuthContext = createContext<AuthContextData>(initialState)

    function AuthProvider ({ children }: Props) {

        const [user , setUser] = useState<User>(initialState.user)
        const [loading , setLoading] = useState(initialState.loading)
        const [signed , setSigned] = useState(initialState.signed)

        useEffect(() => {
            const storedToken = localStorage.getItem('@Auth:TOKEN')
            const storedUser = localStorage.getItem('@Auth:USER')

            if(storedToken && storedUser) {
                setUser(JSON.parse(storedUser))
                setSigned(true)
                api.defaults.headers.authorization = `Bearer ${storedToken}`
            }

        }, [])

        async function signIn() {
            try {

                setLoading(true)

                const { data } = await api.post('/signin')

                api.defaults.headers.authorization = `Bearer ${data.token}`

                const apiUSer = {
                    name: data.name
                }

                localStorage.setItem('@Auth:TOKEN', data.token)
                localStorage.setItem('@Auth:USER', JSON.stringify(apiUSer))
                localStorage.setItem('@Auth:SIGNED', 'true')

                setUser(apiUSer)
                setSigned(true)
                setLoading(false)

            } catch (error) {

            }
        }

        return (
            <AuthContext.Provider value={{ signed , signIn , loading , user }}>
                {children}
            </AuthContext.Provider>
        )
    }

    export { AuthContext , AuthProvider }

Uma abordagem legal foi ter criado um useState para o loading para sabermos se ele está carregando ou não a API e com isso conseguimos pegar esse valor com a Context API e habilitarmos uma página de loading por exemplo.

O restante do projetoé apenas pegando os dados da API fake com o axios e salvando esses dados no localStorage e pegando depois esses dados se existir par setar as variaveis de estado.
