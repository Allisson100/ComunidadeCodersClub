# Testes de performance no React

A web funciona basicmente assim, o usuário pesquisa o nosso site e ele tem que baixar o bundle do nosso site, então só nessa questão já se encontra muitos assuntos sobre performance.

Lembrando que no final nosso site é um bundles com arquivos html, css, javascript, e arquivos de imagem.

### Latência

O tempo / comunicação entre o nosso servidor, o usuário fazendo a requisição e para o servidor e nossa aplicação. É basicamente o tempo de comunicação, qual o tempo que ele vai demorar para baixar esse bundles, o tempo que a requisição dele vai demorar para chegar no nosso servidor. Tudo isso se encaixa na latência.

### Bundle

Mesmo que nós resolvessemos o problema da latência e temos agora uma comunicação muito boa entre usuário e servidor, só isso não adianta, temos que ter uma boa otimização de Bundle também, existe diversas ferramentas para isso já.

### Aplicação

Lembrando que o React trabalha de forma declarativa/reativa, exemplo: Antigamente se quisessemos mudar o texto de um h1 por exemplo, nó tinha que ir até a DOM, pegar o elemento com js e alterá-lo, sendo uma maneira imperativa de se trabalhar.

Já no React como nós trabalhamos em cima de variáveis, nossos elementos mudam de acordo com elas, então se a gente quiser mudar o texto de algum elemento é só mudar sua variável.

Mas dessa maneira que o React trabalha podemos ter problemas de renderização.

O React funciona da seguinte forma, como sabemos existe a Virtual DOM que roda em memória Ram enquanto a Dom verdadeira vamos dizer assim, roda em memória de disco. Então o que acontece, Quando alteramos lá no React a cor de um botão por exemplo, a Virtual Dom vai renderizar nossa aplicação inteira e depois ela vai fazer uma comparação com a Dom antiga em memória de disco e vai analisar o que que mudou entr a Dom Virtual para a Dom verdadeira e ai quando ela saber o que tem de diferente, ela muda na DOM em disco o que tem que ser alterado. Esse processo de comparação chama-se RECONCILIATION.

### Analisando o projeto

Para sabermos se o projeto está ruim ou não temos que ter algumas métricas e uma das ferramentas para se obter esas métrica é o React devtools que é uma extensão do Chrome.

Com esssa extensão a gente ganha aceso a parte dos componets e profiler no dev tools e esssa parte de profiler que mostra como acontece as renderizações, o que gerou atualizações, re-renderizações e etc.

O que causa renderização nos componentes de React:

- Atualização de Props
- Atualização de Estado
- Primeira Renderização
- Atualização de Contexto
- Hooks

Criamos esse pequeno teste na página Home:

    return (
        <>
            <Teste name={teste} />

            <button onClick={handleChangeName}>Trocar Nome</button>

            <Card />
        </>
    )

Quando atualizamos a prop teste, todos os componentes de renderizam novamente.

Mas temos uma forma de deixar esse componente puro, no nosso caso o componente Card, pois ele não deveria ser renderizado caso a props teste mude, pois eles não tem relção.

Para isso utilzamos uma função chamada memo na hora de exportar o componente:

Componente Card:

    import { memo } from "react"

    function Card () {
        return (
            <div>
                <h1>Teste02</h1>
                <h2>Salve</h2>
                <h3>Será que vou ser renderizado novamente ???</h3>
            </div>
        )
    }

    export default memo(Card)

A função memo() ela funciona com as comparações, ou seja, ela compara as props antigas com as novas e caso seja diferente o componente renderiza denovo, mas temos aquele problema de comparações do Javacript, onde isso: {} === {}, vi dar falso e nao true.

Existe a comparação do tipo shallow e do tipo deep.

Shallow:
1 === 1 //true
'a' === 'a' //true
{} === {} //false
[] === [] //false

Não podemos confundir comparações de valores com comparações de referencia, exemplo:

    a = {}
    b = a
    a === b //true

O b na verdade não recebe o valor de a, ele recebe a referencia de memória do a, ouse ja, ambas as variáveis apontam para o mesmo objeto em memória, diferente de eu ter dois obejtos iguais com referencias diferentes.

Shallow: compara valores primitivos e referencia.
Deep: Não compara referencia e compar valor por valor.

Para resolver esse problema nós podemos usar o useCallback para a função, pois assim ele vai passar a referencia de objeto e não mais o objeto em si.

Outro exemplo comum é quando utilizamos funções através de porps e utilizamos arrrow function no onClick, por exemplo:

    function Card ({ propFuncao }) {
        return (
            <button
                onCLick={() => {propFuncao(todo.id)}}
            ></button>
        )
    }

Esse componente nunca será um componente performático, pois ele está recirando aquela função toda hora.

Por isso que fazemos:

    function Card ({ propFuncao }) {

        const handleCompleteToDo = useCallback(() => {
            propFuncao(todo.id)
        }, [todo])

        return (
            <button
                onCLick={handleCompleteToDo}
            ></button>
        )
    }

Dessa forma o nosso componente está muito otimizado. Temos uma melhor performanc do nosso componente.

Usar o memo em tudo nem sempre é a melhor forma, por exemplo, se precisarmos que um componente faça alguma coisa toda vez que a página é atualizada, caso utlizarmos o memo() nada irá acontecer no componente, pois nenhuma props foi atualizada por exemplo.

Sempre passar props utilizando o useCallback(funções) e o useMemo(objetos, arrays).

Caso de uso perfeito para o memo:

- componentes puros
- components que só mudam pelas props
- componentes que não conectados ao redux
- casos de componentes de design system

Temos também o Profiler que exportamos do React que nos ajuda nessa parte de performance:

    import { useState , Profiler , useCallback } from "react"
    import Teste from "../components/Teste"
    import Card from "../components/Card"

    function Home () {

        const [teste , setTeste] = useState('Teste')

        function handleChangeName() {

            if(teste !== 'Allisson') {
            setTeste('Allisson')
            } else {
            setTeste('Teste')
            }

        }

        const onrender = useCallback((...params) => {
            console.log(...params)
        }, [])

        return (
            <>
            <Profiler id='teste' onRender={onrender}>
            <Teste name={teste} />

            <button onClick={handleChangeName}>Trocar Nome</button>

            <Card />
            </Profiler>

            </>

        )
    }

    export default Home

Nós utilizamos o (...params) para pegar os parametros do Provider lá no console.

Como melhorar seu código React:

- usar o dev tools
- usar componentes
- analisar os componentes
- use o memo
- use os hooks de memoização (useMemo e useCallback)
- use o Profiler para metrificar a perfromance do componente

### Bundle

Sempre existiu a necessidade de mexer no Bundle dos projetos no Babel e afins, para sempre tentar otimizar o projeto, pois no final quando fazemos o build do proejeto ele fica todo em Bundle.

Mas hoje em dia já existe diversas ferramentas que nos ajuda nesse assunto então não precisamos mais mexer tanto nisso.

O Next tem su própria ferramenta que já vai gerar o bundle totalmente otimizado.

O vite surgiu também com uma ferramenta muito boa de Bundle. O Vite tem uma performance muito melhor em questão de bundle do que o crate react app.

### Latência

Se quisermos lançar o nosso projeto Next em outro lugar além da vercel temos que adcionar a seguinte config antes de fazer o build:

    "build": "next build && next export",

Temos que adicionar esse && next export na config do package.json

Nessa aula ele fala da policy da amazon S3 caso um dia eu precise:

    {
        "Version":"2008-10-17",
        "Statement":[
            {
                "Sid":"1",
                "Effect":"Allow",
                "Principal":"*",
                "Action":"s3:GetObject",
                "Resource":"arn:aws:::nome-do-aplicação/*"
            }
        ]
    }

Temos uma forma de melhorar a latênia que com a CDN.

CDN são várias redes de entrega de conteúdo espalhadas pelo mundo. Eles guardam cópias do nosso conteúdo(site), para que quando o usuário for acessar o nosso site ele não precise ir até a origem onde o nosso site está hospedado, ele encurta o caminho. Caso nosso site esteja hosepadado na CHina ele não pecisa aguardar todo essa rota até lá, ele pode acessar nosso site de uma CDN.

CDN:

- CloudFront (Amazon)
- CloudFlair

Nessa aula ele ennsina a integrar o nosso projeto da amazon s3 com a CDN CloudFront. Como ambas são da amazon então é fácil a integração.
