# Iniciando curso

### Conceitos básicos React

Virtual Dom: Árvore de elementos que roda em memória.

JSX: JavaScript XML (HTML no JAvaScript).

### Entendendo e instalando o babel e o webpack

O Babel vai ser responsável por pegar meu código JavaScript e passar para uma versão que o navegador entenda.

Para instalar o Babel digitamos:

    yarn init -y

    yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react webpack webpack-cli

Também estamos instalando o webpack, assim como o Babel ele ajuda no processo de transpilação.

Enquanto o BAbel é um transpilador de código o Webpack é um Module Bandler.

Basicamente o Babel faz a transpilação do JavaScript e o Webpack faz a transpilação de outros arquivos como os CSS e etc.

### Configurando o babel

Para configurar o Babel vamos criar um arquivo chamado babel.config.js e nele escrevemos:

    module.exports = {
        presets: [
            '@babel/preset-env',
            '@babel/preset-react'
        ]
    }

### Configurando o webpack e Hello World no React

Vamos criar um arquivo chamado webpack.config.js e nele digitamos:

    module.exports = {
        entry: 'src/index.js' //arquivo principal do projeto
    }

Entre o Linux e Window a / muda na transição de pastas. No linus é barra invertida \, então podemos melhorar o código:

    const path = require('path')

    module.exports = {
        entry: path.resolve(__dirname, 'src', 'index.js')
    }

Esse path ajuda a trabalhar com esses caminhos de pastas.

Temos que configurar também o caminho para onde o arquivo vai ir, ou seja, a saída e para isso criamos a pasta public. Os arquivos que estão nas pasta public vão ficar visíveis para o usuário.

    const path = require('path')

    module.exports = {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        }
    }

E por fim vamos adicionar uma configuração para nossas regras:

const path = require('path')

    module.exports = {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /.jsx?$/, (utilizamos essa expressão regular para ter certeza que o final do arquivo é .jsx).
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
            ]
        }
    }

Agora vamos testar para ver se está tudo certo.

No arquivo index.js criamos uma função de teste:

    const consoleLog = () => {
        console.log('Hello World');
    }

E para rodá-lo temos que digitar no terminal:

    npx webpack --mode development

Com esse comando ele vai transpilar o nosso código com o webpack e como o webpack utiliza o Babel é como se tudo estivesse entrelassado, essas ferramentas se complementam.

Depois de rodar esse comando dentro da pasta public terá um arquivo chamado bundle.js.

##### Agora vamos começar a trabalhar com react

Para isso no terminal vamos instalar o react e o react dom com o comando:

    yarn add react react-dom

O react é o próprio react que vamos utilizar e react-dom é a ferramenta que vai integrar o nosso react com a dom.

Vamos criar um arquivo index.html dentro da pasta public e nele digitamos:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    </html>

Criamos uma estrutura básica de html e apenas criamos uma div com id app dentro do body.

Agora vamos criar de fato nosso arquivo react.

Dentro do arquivo index.js vamos apagar aquela função e criar o nosso arquivo react digitando:

    import React from 'react'
    import { render } from 'react-dom'

    render(<h1>Hello React World</h1>, document.getElementById('app'))

Nós importamos o que era necessário do react e react-dom

E utilizamos a função para renderizar na tela aquele h1, mas precisamos passar como segundo argumento a referencia do lugar onde esse h1 será renderizado que no caso é naquela div que a gente criou no arquivo html com o id app.

Agora para rodar o código precisamo usar um servidor do webpack e para isso digitamos no terminal:

    npx webpack serve --mode development

Antes de rodar esse comando precisamos fazer as configurações do servidor do webpack. Para isso precisamos instalar a biblioteca webpack-dev-server, digitamos no terminal:

    yarn add webpack-dev-server

E para configurá-lo, vamos no arquivo webpack.config.js e digitamos:

module.exports = {

    ...

    devServer: {
        publicPath: '/',
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
    },

    ...

}

E agora sim podemos rodar o comando:

    npx webpack serve --mode development

Tive alguns problemas para rodar o servidor e parece que algumas mudaram para o webpack server do víddeo para o que eu estou usando agora, para resolver eu mudei as configurações do webpack para:

    devServer: {
        static: {
            directory: path.join(__dirname, "public/"),
        },
        port: 3000,
        hot: true,
    },

Esquecemos de importar o arquivo bundle.js lá no arquivo index.html, se não fizer isso o código jsx não vai aparecer na tela.

Agora deu tudo certo.

### Entendendo o Create React App (CRA)

Para criar todo esse proejeto que fizemos com o webpack e babel de forma automática, vamos utilizar o create-react-app no terminal:

    npx create-react-app reactapp

Com isso Ele criar todo uma estrutura automática para nós.

Porém existe diferenças entre usar o CRA e configurar o webpack/babel manualmente.

Webpack:

- Controle maior
- Mais leve

CRA:

- Mais prático
- A maior vantagem do create react app é a compatibilidade, pois a maioria das coisas que são criadas para o react tipo bibliotecas e etc, são pensadas pra o CRA e pode ter casos de bibliotecas que vão dar suporte para o CRA, mas não vão dar suporte para a configuração manual do webpack e babel.

### Componentização

Ensina sobre componentes.

### Props e Children

Ensina sobre props e children.

### Estado e useState

    const [contador , setContador] = useState(0)

    function mudaContador() {
        setContador(contador + 1)
        console.log(contador);
    }

Esse exemplo aqui pode dar um problema caso não tenha sincronismo.

Exemplo:

    function mudaContador() {
        setTimeout(() => {
            setContador(contador + 1)
        }, 2000)
    }

Dessa forma nosso contador só vai mudar depois de 2 segundo, mas se eu der um duplo clique ele não vai mudar nosso contador para 2 e depois de dois segundos para 3, ele vai manter 2. Isso ocorre, pois com o duplo clique chamamos a função duas vezes, mas no momento do duplo o valor do contador era o mesmo, no caso era 1, então ambas as execuções fizeram 1 + 1. Para arrumar isso precisamos fazer o seguinte:

    function mudaContador() {
        setTimeout(() => {
            setContador((oldContador) => oldContador + 1)
        }, 2000)
    }

Nesse caso quando passamos uma função anônima e passamos para ela um parâmetro com o valor de contador, a função sempre vai retornar o valor atualizado no duplo clique.

Nós utlizamos essa nomemclatura de oldContador para esse tipo de situação.

Ou seja, quando vamos utilizar a própria variável em seu set, devemos utilzar essa sintaxe de arrow function. Nesse caso o setContador atualiza o estado da variável contador, mas como nós utilizamos a própria variável contador para mudar seu valor através da função setContador(conatdor + 1), então devemos usar arrow funtion para evitar o assincronismo.

Quando temos um cálculo muito complexo, exemplo:

    const [contador , setContador] = useState(1594198191 * 19195191)

Toda vez que nosso código é renderizado o código é feito, mas se nós mudarmos isso para:

    const [contador , setContador] = useState(() => 594198191 * 19195191)

Nós teremos esse cálculo feito apenas uma vez e com isso podemos ganhar um pouco de performace.

É claro que esse cálculo ainda é simples, mas se por algum motivo tivermos calculos gigantes e complexos, podemos utilizar arrow function.

### Ciclo de vida e useEffect

Hooks são ganchos que vão executar em determinada ações.

O primeiro hook que vamos conhecer é o hook useEffect, ele é conhecido como o hook de ciclo de vida.

Qualquer Hooks não pode ser utilizado antes do componente, não pode ser utilizado tmbémd entro do return, sempre ter que manter ele dentro do componente por conta do mode que o React funciona.

O useEffect por padrão ele executado uma vez quando o componente é renderizado e ele é executador novamente quando existe algum update ns props ou variáveis de estado. Caso a gente queira executar uma função qunado o componente for desmontado devemos fazer com que o useEffect nos retorne algum, ou seja, utilizar o return:

    useEffect(() => {
        return () => {
            console.log('DESMONTOU')
        }
    }, [])

Nesse exemplo o useEffect será executado somente quando o componente for executado, esse conceito pode ser usado por exemplo quando queremos saber o tempo que algum usuário ficou em detreminada parte do site. Lembrando que isso só é possível por que passamos o array de dependencias vazio.

Porém podemos ter outro uso temabém dele:

    useEffect(() => {
        setContador(10)

        return () => {
            console.log(`List--contador: ${contador}`)
        }

    }, [contador])

Desse modo ele vai executar tudo até return, porém o return só será executado novamente caso o componente seja desmontado.

Exemplo de como podemos desmonatar um componente:

Arquivo App.js:

    import { useState } from "react";
    import List from "./components/List";

    function App() {
        const [ showList, setShowList ] = useState(true)

        return (
            <div>
            <h1>Hello Hello</h1>
            {showList && <List />}
            <button onClick={() => setShowList((oldShowList) => !oldShowList)}>Aumenta contador</button>
            </div>
        );
    }

    export default App

Aqui por exemplo nós criamos uma variável de estado para conseguirmos desmontar o componente.

Na parte do return criamos a sigla do curto circuito (&&), ou seja, só acontece na direita se na esquerda for verdadeiro, basicamente um if.

Então nó colocamos entre chaves e falamos que caso a variável showList for verdadeira para mostrar o componente <List/>, caso contrário não mostrar.

Para alterar o valor dessa variável de true para false e de false para true, nós criamos um evento de clique no botão para que setShowList pegasse o valor antigo do showList (oldhowList) e que irvertesse esse valor (!oldShowList) e com isso conseguimos ver o funcionamento do useEffect quando desmontar o componente.

Então resumindo:

Utilizando useEffect quando o componente é CRIADO (MOUNT): //Detalhe para o array vazio

    useEffect(() => {
        console.log('Faça Alguma coisa')
    }, [])

Quando o componente for ATUALIZADO (UPDATE):

    useEffect(() => {
        console.log('Faça Alguma coisa')
    }, [nome_da_variável_que_será_utilizada_para_essa_atualização])

Quando o componente for DESMONTADO (UNMOUNTED): //Detalhe para o array vazio e o return() => {}

    useEffect(() => {
        return () => {
            console.log('Faça Alguma coisa')
        }
    }, [])

### useCallback e useMemo

    import { useEffect, useState } from "react";

    const set = new Set()

    export default function List () {

        const [contador, setContador] = useState(1)

        function handleSetContador() {
            setContador((oldContador) => oldContador + 1)
            set.add(handleSetContador)
        }

        console.log(set.size)

        return (
        <div>
            Contador: {contador}
            <button onClick={handleSetContador}>
                Aumenta Contador
            </button>
        </div>
        )
    }

Nesse exemplo acima podemos observar que toda vez que nós clicarmos no botão a função handleSetContador() será recriada e isso pode custar processameno dependendo do caso, principalmente se tivermos que passar essa função através de props o que irá causar muitas renderizações desnecessárias.

Para resolver esse problema podemos utilizar o o useCallback. Para utilizá-lo digitamos:

    const handleSetContador = useCallback(() => {
        setContador((oldContador) => oldContador + 1)
        set.add(handleSetContador)
    }, [])

Basicamente trocamos a função pelo useCallback e dessa forma a função não será mais recriada, esse caso é recomendado principalmente qaundo temos que passar uma função como props para outro componente.

E o useMemo segue a mesma linha do useCallback, exemplo:

    const number = useMemo(() => {
        return (
            16151651651 * 1615616516516
        )
    }, [])

Nesse caso ele também serve para criar a constante uma única só vez e é recomendável quando queremos fazer cálculos muito difíceis e complexos que requer um certo processamento e também quando vamos passar esses valores por props.

### useEffect Assincrono

    useEffect(() => {
        async function getUserRepositories() {
        await localStorage.setItem('user-repositories', JSON.stringify({}))
        }

        getUserRepositories()
    })

Para criar useEffect assincronos temos que criar a função assincrona dentro do próprio useEffect e chamamos a função lá dentro.

Podemos fazer de outra forma também :

    useEffect(() => {
        (async function getUserRepositories() {
        await localStorage.setItem('user-repositories', JSON.stringify({}))
        }) ()
    })

Podemos fazer a chamada da própria função com o uso do parenteses.

### Requisições HTTP e Axios

Podemos usar o fetch que já nativo do JavaScript, mas no React é mais comum utilizar o axios. Para utilizá-lo temos que instalar no terminal com o seguinte comando:

    yarn add axios

O axios vai servir para fazer requisições da mesma forma que o fetch, mas o axios traz uma api mais amigável para se trabalhar.

Para organização vamos criar uma pasta services e dentro dela um arquivo chamado api.js.

api.js:

    import Axios from "axios"

    export default Axios.create({
        baseURL: 'http://api.github.com/users/'
    })

Basicamente aqui a gente definiu uma instancia do axios e passamos uma baseURL que nesse caso foi o da API do github.

App.js:

    import {  useState } from "react";

    function App() {

    const [username, setUsername] = useState('Allisson100')


    return (
        <div>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>

        </div>
    );
    }

    export default App

Basicamente criamos um iput para colocar o nome do usuário lá do github.

Para que esse valor do input seja lido corretamente, nós temos que usar uma bind, ou sejá, fazer uma conexão dele com uma variável de estado. Por isso que o value está com a constante e o evento onChange está chamando uma função para e com isso conseguimos obter o valor que está no input e setamos ele na variável setUsername.

App.js:

    import {  useState } from "react";
    import api from "./services/api";

    function App() {

    const [username, setUsername] = useState('Allisson100')
    const [userData, setuserData] = useState({})

    async function getUserGithubData() {
        const { data } = await api.get(username)

        setuserData(data)
    }


    return (
        <div>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
        <button onClick={getUserGithubData}>Pesquisar usuário</button>
        {userData.name}
        {userData.company}
        </div>
    );
    }

    export default App

Para utilizar essa requisição com axios a gente faz o import da api, lembrand que tem que ser uma função assincrona, e desestruturamos os dados e setamos ele em umavariável de estado. Agora vou mostrar um exemplo com fetch:

    async function testFetch () {

        const data = await fetch(`http://api.github.com/users/${username}`)

        const dataConvertida = await data.json()

        console.log(dataConvertida.bio);
    }

Aqui basicamente criamos uma const para armazenar od daddos da api e outra para transformar em um formato válido atrvés do json().

### Local e Session Storage

    async function getUserGithubData() {
        const { data } = await api.get(username)

        localStorage.setItem('@reactapp/githubUserData', JSON.stringify(data))

        setuserData(data)
    }

Aqui na função que nós obtemos os dados da api nós salvamos esses dados no localStorage.

    useEffect(() => {
        const localStorageUserData = localStorage.getItem('@reactapp/githubUserData')

        setuserData(JSON.parse(localStorageUserData) || {})
    }, [])

E agora utilizamos o useEffect para pegar esses dados do localStorage. Com isso quando a página é fechada e aberta novamente ou atualizada os dados persistem na página.

Caso a gente queira que os dados ficam na tela somente quando a página é atualizada e não quando a página é fechada e aberta novamente devemos suar o sessionStorage. Exemplo:

    useEffect(() => {
        const localStorageUserData = sessionStorage.getItem('@reactapp/githubUserData')

        setuserData(JSON.parse(localStorageUserData) || {})
    }, [])

    async function getUserGithubData() {
        const { data } = await api.get(username)

        sessionStorage.setItem('@reactapp/githubUserData', JSON.stringify(data))

        setuserData(data)
    }
