# Navegação com React Router Dom

Hoje em di existe o conceito de SPA (Single Page Application) e pra isso utilizamos o react router dom.

Para instalá-lo vamos digitar no terminal:

    npm install react-router-dom @types/react-router-dom

Lembrando que instalamos os tipos por conta do typescript

Agora vamos criar a pasta routes e dentro dela o arquivo index.tsx e nele digitamos:

    import { Routes, Route } from "react-router-dom";
    import SignIn from "../pages/SignIn";

    export default function AppRoutes () {
        return (
            <Routes>
                <Route path='/login' element={<SignIn/>}/>
            </Routes>
        )
    }

Nesse caso utilizamos o /login para carregr aquela página. E no arquivo App.tsx fizemos:

    import GlobalStyles from './styles/global'
    import theme from './styles/theme'
    import { ThemeProvider } from 'styled-components';

    import AppRoutes from './routes'
    import {  BrowserRouter as Router } from 'react-router-dom';


    function App() {

    const newTheme = theme.default

    return (
        <ThemeProvider theme={newTheme}>
        <Router>
            <GlobalStyles />
            <AppRoutes />
        </Router>
        </ThemeProvider>
    );
    }

    export default App;

Vale lembrar que podemos encapsular as rotas com o Router tanto aqui no arquivo App.tsx como no arquivos de rotas em si.

    - E também podemos usar <Route path='/login' element={<SignIn/>}/> ou  <Route path='/login' Component={SignIn}/> para definirmos qual componente renderizar nas rotas.

Podemos instalar o History que nos ajuda com as setinha do navegador para voltar ou avançar uma página, mas no meu app já está funcionando normal não sei se futuramente pode ocorrer algum erro, mas de qualuqer forma para instalá-lo digitamos no terminal:

    npm install history @types/history

Mas para aprender vou fazer a instalação.

Vamos criar agora uma psta chamada services e dentro dela um arquivo chamado history.ts e nele digitamos:

    import { createBrowserHistory } from "history"

    export default createBrowserHistory()

Com isso já temos o history criado, mas não vou utilizá-lo, pois vou estudar mais depois sobre ele.

QUANDO EU FOR UTILIZAR O REACT ROUTER, VER O VIDEO React Router: O guia completo para navegação em aplicativos React DO MATHEUS BATTISTI, POIS ELE ENSINA O JEITO ATUALIZADO DE USAR O REACT ROUTER DOM.
