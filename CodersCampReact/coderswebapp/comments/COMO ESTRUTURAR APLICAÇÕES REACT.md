# COMO ESTRUTURAR APLICAÇÕES REACT

### Como criar um projeto React?

- Create rect app
- Webpack / Rollup
- Vite
- Next (Server Side Rendering / Static Side Generating)

Critérios para se penadar na hora de tomar uma decisão:

- Benefícios
- Custos (performace, tempo/curva de aprendizado)
- Uso no mercado
- Conhecimento do time
- Regra da simplicidade

### Padronização do projeto

- Eslint (EchmaScript + lit (indicador/aviso de algum erro no nosso código))

Para adicionar o lint no nosso porjeto digitamos no terminal:

    npx eslint --init

    npm init @eslint/config (versão mais atual)

Outra ferramenta muito boa para apdronização é o Prettier.

- Prettier

O Prettier complementa bem o Eslint.

Para adicionar o Prettier digitamos no terminal:

    yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

Vamos criar um arquivo de configuração do Prettier chamado .prettierrc e nele digitamos:

    {
        "singleQuote": true,
        "trailingComma": "es5",
        "tabWidth": 2
    }

Dentro do arquivo de configuração do vsCode digitamos:

"editor.formatOnSave": true,

# Pausa

Os comandos do vídeo não estavam funcioando, mas pesquisei e resolvi.

Criei um novo projeto com o vite.

    yarn create vite

Depois digitei yarn pra instalar as depedencias.

    yarn

Depois instalei o eslint config:

    yarn create @eslint/config

Depois instalei o Prettier:

    yarn add -D eslint-config-prettier prettier

Depois criei o arquivo de configuração do Prettier e também dei aquele comando do autosave e desabilitei a regra do React.

Também tenho que adicionar o prettier lá na config de dependencias.

### Por algum motivo o Eslint com o Prettier não funciona quando uso typescript, funciona apens sem o typescript, mais para frente eu vejo o porque.

### Continuando aula

### Padronização do projeto

- Eslint
- Prettier
- Conventional commits
- Husky (para forçar o usuário seguir as regras de formatação)

Essa parte vou estudar depois de forma separada para saber o que não está funcionando.

### Estruta de páginas

O idela é seguir uma estrutura onde, criamos uma pasta chamada Ppages e dentro dessa pasta criamos outras páginas referentes a página do site por exemplo a pasta chamada Home e dentro dela criamos o index.tsx.

Basicamente a parte de estrutras é isso, mas iremos ver mais a respeito na próxima aula.

### Roteamento

- React router dom

React Router é aprincipal ferramenta de rotas no React e é o que todo mundo usa.

Para utiliza-lo usamos o comando:

    yarn add react-router-dom

Agora vamos criar uma pasta chamada routes e dentro dela criar um arquivo chamado index.tsx.

Dentro desse arquivo vamos adicionar todas as rotas que a gente tem. Vamos fazer os links de cada rota para cada página:

    import {
        BrowserRouter as Router,
        Routes,
        Route,
    } from "react-router-dom";
    import Home from "../pages/Home";

    export function AppRoutes () {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                </Routes>
            </Router>
        )
    }

Aqui basicamente linkamos a rota '/' para o conteúdo do componente <Home />.

Agora vamos criar uma pasta para a página About para testar e criamos uma nova rota.

    <Route path="/about" element={<About />}/>

Criamos uma rota de segurança vamos assim dizer para que quando o usuário acessar uma rota que não exista, nós podermos redirecionar ele para outra página ou mostrar uma erro 404.:

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>

                <Route path="*" element={<Home />}/>
            </Routes>
        </Router>
    )

Assim se eu tentar acessar qaulquer rota que não exista eu vou ser direcionado para a página Home.

### Estilização

- CSS
- Pré processadores de CSS (SASS, LESS, Stylus)
- Pós processadores de CSS (PostCSS)
- CSS IN JS (Styled Components, Emotion)
- Tailwind

- Aula21 na comunidade fala bem sobre esses assuntos.

Hoje a melhor ferramenta é o CSS IN JS, pois ele tem tudo o que os outros tem. Faz tudo o que o Saas faz e ainda tem mais.

Para adicionar o styled component no projeto digitamos:

    yarn add styled-components

Dentro da pasta src vamos criar também uma outra pasta chamada styles onde vão ficr guardados os estilos globais e estilos de temas de nossa aplicação.

E dentro desse arquivo podemos colocar algo parecido com o que é o reset css:

    import { createGlobalStyle } from "styled-components";

    export default createGlobalStyle `
        * {
            margin: 0;
            padding: 0;
            outline: 0;
            box-sizing: border-box;
        }

        html {
            font-size: 62.5%;
        }

        html, body, #root {
            height: 100%;
            font-family: SulSans, Helvetica, sans-serif;
        }

        body {
            text-rendering: optimizedLegibility !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale;
        }

        #app {
            display: flex;
            justify-content: center;
        }
    `

Nós utilizamos a crase e também no font size aplicamos um 62.5%, pois assim fica fácil saber quantos rem tem uma font através dos pixel ou seja, 10px é igual a 1rem, pois é só dividir por 10.

E para criar os estilos locais, nós criamos na pasta referente do componente um arquivo chamado styles.ts e lá nó exportamos o styled components:

    import styled from 'styled-components'

    export const Title = styled.h1 `
        color: green;
    `;

Aqui basicamente criamos um componente Title que nada mais que uma tag h1 com a cor verde, porém com isso lá no arquivo index da Home podemos fazer o seguinte:

    import { Title } from "./styles"

    function Home () {
        return (
            <Title>Home</Title>
        )
    }

    export default Home

De vez usar um h1, utilizamos esse componente title que representa o h1 porém na cor verde.

### Gerenciamento de estado

Isso basicamente é uma forma de termos um estado global em nossa aplicação.

- Redux (Thunks e Saga - Redux Toolkit) (Aula02 e aula 03 na comunidade)
- Context API
- Recoil
- Zustand
- Jotai

O que mais vamos ver é Redux padrão por ser algo mais antigo, mas agora non nosso projeto vamos usar o Zustand, pois é a biblioteca mais fácil de se usar. Para isso digitamos no terminal:

    yarn add zustand

Vamos criar uma pasta chamda stores para armazenr os nossos estados. Dentro dessa pasta vamos criar um arquivo chamado useUserData.ts e nele digitamos:

    import { create } from "zustand";

    type User = {
        name: string;
        age: number;
    }

    export const useUSerData = create<User>(() => ({
        name: 'Allisson',
        age: 22,
    }))

Basicamente criamos um Hook.

Com isso já temos o nome sistema de gerenciamento de estado configurado e pronto para uso. Para usá-lo vamos no nosso arquivo Home e digitamos:

    import { useUSerData } from "../../stores/useUserData"
    import { Title } from "./styles"

    function Home () {

        const { name, age } = useUSerData();

        return (
            <>
                <Title>Home</Title>

                <h2>{name}</h2>
                <h3>{age}</h3>
            </>

        )
    }

    export default Home

E para alterar esses dados do name e age basta digitarmos:

    import { useUSerData } from "../../stores/useUserData"
    import { Title } from "./styles"

    function Home () {

        const { name, age } = useUSerData();

        function changeUSer () {

            useUSerData.setState({
                name: "Luke",
                age: 26
            })
        }

        return (
            <>
                <Title>Home</Title>

                <h2>{name}</h2>
                <h3>{age}</h3>

                <button
                    type="button"
                    onClick={changeUSer}
                >
                    Mudar Usuário
                </button>
            </>

        )
    }

    export default Home

Nesse exemplo criamos um button que chama uma função e faz essa mudança de estado nas variáveis name e age e dessa forma conseguimos evitar esse conceito de props drilling.

E com isso quando há uma alteração dessas variáveis em qualquer componente, todos os componentes vão utilizar os valores atualizados independentemente de qual componente trocou os valores da constante.

Ou seja, agora eu tenho um estado global sendo compartilhado de uma maneira muito fácil.

O Zustand também tem um Middleware para trabalhar com persistência de dados muito fácil.

Por exemplo se quisermos ter esses dados salvos na tela mesmo que tenha um reload, ou seja, salvo em localStorage digitamos:

    import { create } from "zustand";
    import { persist } from "zustand/middleware"

    type User = {
        name: string;
        age: number;
    }

    export const useUSerData = create<User>()(
        persist(
            () => ({
                name: 'Allisson',
                age: 22,
            }),
            {
                name: 'useUSerData',
            }
        )
    )

Dessa forma utilizando o persist, quando apertamos o botão na página Home, as constantes vão mudar e persistir no localStorage e com isso quando recarregarmos os dados vão persistir.

### Componentização (UI Libs)

- Material UI
- Ant Design
- BootStrap
- Materialize

- Design System

Design System é basicamente a empresa que cria seus próprios estilos de componentes, eles não utilizam um design padrão de componentes de algum UI libs. Nem faz muito sentido também, pois se você tem os disignes é melhor eles criarem um estilo próprio para a empresa.

- Declarative UI:
  - Chakra UI

Basicamente a declarative ui vai usar os porps para fazer o CSS e não utilizar o css em si. Vamos dizer que nós queremos estilzar uma tag p, nós simplesmente passamos apenas valores na classe, mas não tip font size de 3rem por exemplo, tem uma sigla exemplo text-lg que representa um font size específico.

### Comunicação com API

- Fetch
- Axios

- Cache: (Tem aula na comunidade)
  - React query
  - SWR

Basicamente esses caches adicionam uma camada aciima do requidores que são o fetch e o axios.

Para adiconar o axios no porjeto digitamos:

    yarn add axios

Criamos entoa uma pasta chamada services e dentro dela criamos dois arquivos um chamado api.ts e outro user.ts.

api.ts:

    import axios from "axios";

    export default axios.create({
        baseURL: 'https://api.github.com/'
    })

user.ts:

    import api from "./api";

    export async function getUser(user: string) {
        return api.get(`users/${user}`)
    }

Basicamente no arquivo api.ts nó utilizamos a url basica da api e com isso conseguimos exportar essa string.

E no arquivo user.ts nós requisitamos aquela string do arquivo api e completamos ele com template string com o user do github.

No arquivo home:

    async function changeUSer () {

        const {data} = await getUser('lukemorales');


        useUSerData.setState({
            name: data.name,
            age: data.followers
        })
    }

Agora basicamente nosso botão chama a função changeUser que dentro dela define com uma desestruturação uma const chamada { data } que vai receber a função assincrona da função getUser que exportamos e mostramos seu nome na tela.

### Testes

(Já temos essas aulas na comunidade)

- Enzyme
- React Testing Library
- Jest

O padrão de teste é criar uma psta no src com o nome **tests**.

Dentro dessa pasta criamos a estrutra igual a página pages, entaõ dentro da pasta tests vamos ter a pasta pages dentro dela a pasta Home e se vamos testar o arquivo index da página Home criamos o arquivo index.test.tsx

### Storage

- Local storage

Criamos uma requisição de api do localStorage que já vem como padrão no projeto, isso tudo dentro do arquivo user.ts dentro da pasta storage dentro da services:

    export function getStoredUserName(): string {
        return localStorage.getItem('@front:username') || ''
    }

    export function setStoredUserName(username: string) {
        localStorage.setItem('@front:username', username)
    }

##### LocalDataBase

- SQLite

É basicamente um banco de dados para o front.
