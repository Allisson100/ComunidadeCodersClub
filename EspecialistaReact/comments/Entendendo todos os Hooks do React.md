# Entendendo todos os Hooks do React

Hooks: Uma forma de trabalhar com as funcionalidades do React, sem precisar criar classes.

Como funcionam:

- Precisam estar no top level do componente
- Podem ser chamdos dentro de custom Hooks.

O React logo na montagem do componente ele vai verificar quais são todos os Hooks que existem naquele componente, por isso não podemos colocar Hooks em scopos tipo o um If.

Criei um projeto novo chamado hooks para essa aula.

### Estado (useState()):

- São valores, que, ao serem atualizados, re-renderizarão o componente.

Ele ensina o Hooks useState().

Hooks básicos:

- useState()
- useRef()
- useEffect()

### Referência (useRef()):

- Guardar referência de um elemento da DOM.
- Guardar valores que não atualizaram o componente.

  import { useState } from 'react'
  import './App.css'

  function App() {

  const [email , setEmail] = useState('')

        return (
            <>
            Email:
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </>
        )

  }

  export default App

Temos esse exemplo aqui que é um padrão para pegar os dados do input e atribuí-lo a uma variável de estado, mas como sabemos toda vez que o evento onChange acontecer ele vai atualizar a variável e com isso atualizar o componente.

Esse exemplo é conhecido como componentes não controlado, que é quando o componente (nesse caso o input) está sendo controlado pelo estado.

    function App() {

    const ref = useRef<HTMLInputElement>(null)

    function log() {
        console.log(ref);

        if(ref.current) {
            ref.current.value = 'teste'
        }
    }

        return (
            <>
            Email:
                <input type="text" ref={ref} />
                <button onClick={log}>Log</button>
            </>
        )
    }

Nesse exemplo aqui conseguimos atualizar o valor do input quando clicamos no botão, mas ainda o código está estático. Dessa form conseguimos colocar valores no input como se eu estivesse criando uma função no javascript tradicional, document.getElementById('id').value = '123'.

    function App() {

        const contador = useRef<number>(1)

        function log() {
            if(contador.current) {
                contador.current = contador.current + 1

                console.log(contador.current);

            }
        }

        return (
            <>
            {console.log('segundo', contador.current)}
            Email:
            <input type="text"/>
            <button onClick={log}>Aumenta contador</button>
            </>
        )
    }

Dessa forma aqui o botão está chamando a função, porém nossa página não está sendo atualizada.

### Efeito (useEffect()):

Explica sobre o ciclo de vida do componente.
Explica o useEffect.

Ciclo de vida:

1. Componente Montado (renderizado)
2. Componente Atualizado (re-renderizado)
3. Componente Desmontado.

- Primeiro Caso (Montador)

  useEffect(() => {
  console.log('Foi montado')
  }, [])

- Segundo Caso (Atualizado)

  useEffect(() => {
  console.log('Foi montado')
  }, [variável_de_estado])

- Terceiro Caso (Desmontado)

  useEffect(() => {
  console.log('Foi montado')

        return () => {
            console.log('Foi desmontado')
        }

  }, [])

Nesse caso ele vai ser executado uma vez e vai printar o Foi Montado, mas depois só vai ser executado de novo caso o componente seja desmontado e ai sim printará Foi desmontado. E é aqui que removemos os eventListener também.

Ponto de atenção aqui é que, o array de dependecias deve existir, mas tem que ser vazio, caso tenha alguma variável nele, ele irá executar mesmo quando não for desmontado.

- Funções assincronas

Se quisermos usar o useEffect como função assincrona devemos fazer o seguinte:

useEffect(() => {
async function getApiData () {
await concole.log()
}

    getApiData()

}, [])

Podemos usar dessa forma e temos que chamar a função dentro do useEffect.

Ou podemo fazer da seguinte forma:

    useEffect(() => {
        (async function getApiData () {
            await concole.log()
        })()
    }, [])

E assim a função auto se chama ai não precisa chamá-la que nem o primeiro caso. Os dois funcionam de maneiras iguais.

Por questões de padronização é mehlor usar o primeiro modo.

A respeito do useRef(), devemos utilizar ele quando for realmente muito necessário, pois perder o controle que o useState nos dá em um formulário por exemplo é muito ruim, existe uma ferramenta chamada FORMIK que é muito boa para utilizar nesses casos de formulário muito grande.

Estudar depois sobre o FORMIK.

### Hooks de memoização

1. Renderização desnecessária dos filhos.
2. Operações pesadas sendo reexecutadas.

Para resolver esses problemas temos dois hooks.

- O useMemo(), exemplo:

  const resultado = useMemo(() => {
  return 5156156156165 \* 1651651616156
  }, [])

Dessa forma podemos guardar esse valor enorme e essa variável só será renderizada uma única vez. E podemos colocar variáveis no array de depndencias que nem utilizamos no useEffect().

Temos também o useCallback(), exemplo:

    const aumentaContador = useCallback(() => {
        console.log("Aumenta Cotador");
    }, [])

Esse Hooks tem a mesma função do useMemo, mas ele serve para funções enquanto o useMemo serve para variáveis.

Nesse caso a const aumenta contador é realmente uma função e ela precisa ser chamada em um botão por exemplo.

E da mesma forma podemos colocar uma variável no array de dependecias.

### Problemas

Temos um problema nesses Hooks, eles tem um custo, então não podemos sair utilizando eles em tudo, somente em funções ou variáveis que tenham um custo de processsamento muito grande.

VER POSTS DO KENT C. DODDS.

### useReducer()

    function contadorReducer(state: number, action: { type: string}) {
        switch (action.type) {
            case 'SUM_1':
                return state + 1
            case 'SUB_1':
                return state - 1
            case 'MULT_10':
                return state * 10

            default:
            throw new Error('Invalid Action')
        }
    }

    function App() {

        const [contador , dispatchContador] = useReducer(contadorReducer, 0)


        return (
            <>
                Contador: {contador}

                <button onClick={() => dispatchContador({ type: 'SUM_1' })}>SOMA1</button>
                <button onClick={() => dispatchContador({ type: 'SUB_1' })}>SUB1</button>
                <button onClick={() => dispatchContador({ type: 'MULT_10'})}>MULT10</button>
            </>
        )
    }

Isso é uma forma mais dinâmica para utilizar a mesma função para diferentes casos e evitar o use de varios ifs e tudo mais.

Basicamente criamos uma variável de estado ms com o hook useReducer e nele passsamos dois parâmetros, a função e o valor inicial, então:

    const [contador , dispatchContador] = useReducer(contadorReducer, 0)

Aqui estamos dizendo que contador tem valor inicial de 0 e essa função contadorReducer, estmoa chamando ela fora do componente.

    <button onClick={() => dispatchContador({ type: 'SUM_1' })}>SOMA1</button>

No nosso botão chamamos a função dispatchContador que é basicamente a função que altera o valor de contador, mas devemos passar um parâmetro para ele que é o tipo para sabermos diferenciar qual é tipo de operação que queremos fazer e devemos fazer isso passando o type em um objeto.

    function contadorReducer(state: number, action: { type: string}) {
        switch (action.type) {
            case 'SUM_1':
                return state + 1
            case 'SUB_1':
                return state - 1
            case 'MULT_10':
                return state * 10

            default:
            throw new Error('Invalid Action')
        }
    }

Essa função que fica fora do componente é a função que definimos no Hook como um dos parâmetros. Ela vai pegar o valor atual do contador (state) e também o action (que é o type que cada botão passsa um type diferente) e dentro da função ela faz o swtich case acho o verdadeiro e atualiza o estado da constante de acordo com o return.

Esse não é um hook muito utilizado, mas é bom saber.

userReducer(): Alternativa o useState() para quando há fluxos diferentes de atualizações.

### forwardRef

Precisamos entender que, quando queremos passar a referencia como props devemos fazer daseguinte forma:

App.tsx:

    function App() {

        const ref = useRef<HTMLInputElement>(null)

        return (
            <>
                <Input ref={ref}/>
            </>
        )
    }

Componente Input:

    import React , { Ref } from "react"

    interface Props {

    }

    const Input = React.forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {

        return (
            <input type="text" ref={ref}/>
        )
    })


    export default Input

Temos que utilizar do React.forwardsRef para repasssar essa props ref para o filho.

Isso tudo temos que ter em mente para entender o próximo hooke que é o useImperativeHandle().

Esse hook quase não é utilizado, e também é recomendável não utilizá-lo, mas há casos que é necessário então é bom aprender.

Com ele nós podemos mudar os valores de nossa referência, e também podemos executar alguma coisa baseada em cima dessa nova referência.

Exemplos:

    import React , { Ref, useImperativeHandle } from "react"

    interface Props {

    }

    const Input = React.forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
        useImperativeHandle(ref, () => ({
            focus: () => {
                console.log('focus')
            }
        } as HTMLInputElement))

        return (
            <input type="text" ref={ref}/>
        )
    })

Desse modo aqui nós estamos dizendo que quando a função focus() for chamada para o elemento que utiliza o ref, essa função não vai dar focus no elemento e sim chamar o console.log.

Então esse Hooks tem a capacidade de mudar o que uma função faz por exemplo.

No fim da aula ele ensina a criar um Hook.

Custom hooks:

- Reutilizar lógica

### useDebugValue()

Utilizamos esse hook dentro dos nossos hooks customizados, pois nele conseguimos criar uma descrição, exemplo:

    function meuHook() {

        ... lógica do hook ...

        useDebugerValue('Hook de Requisição')
    }

Isso é interessante e ajuda a nós debugar a aplicação e nele conseguimos passar textos ou variáveis e conseguimos ter acesso facilmente no dev tools naquelas abas que aparecem com a extensão do react no chrome.

Poderiamos suar um console.log também, mas esse hook serve somente em ambiente de desenvolvimento ele não sobe para a produção diferente do console.log.
