# Como utilizar os hooks

O principais Hooks do React:

- useState
- useEffect
- useContext
- useMemo
- useCallback

Uma regra própria do React é que todo Hook começa obrigatoriamente com a palavra use, seja um Hook do próprio react ou algum Hook que nós mesmo criamos.

A segunda regra é que nosso hook precisa ser renderizado, precisa ser utilizado, somente dentro de componentes e em outros hooks. 

Terceira regra é que não podemos utilizar os nossos Hooks em  loops, condicionais ou funções aninhadas. Ele tem que ser utilizado somente na raiz do nosso componente.

Exemplo:

App.js:

    function App() {

        let [text, setText] = useState('Click Me!!')

        return (

        )
    }

O Hook tem que ser usado logo após a ebrtura do componente que nesse caso é o App, não podemos colocar ele dentro do return e nem dentro de alguma outra função.

Essas são as três principais regras.


