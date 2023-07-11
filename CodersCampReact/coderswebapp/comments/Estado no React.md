# Estado no React

Para entendermos esse conceito melhor vamos utilizar o exemplo de que queremos mudar simplemente o nome que vem escrito dentro do botão:

App.js:

    function App() {

        let text = 'Click Me'

        function changeText() {
            text = 'Clicado'
        }

        return (

            <div className="App">
            <button onClick={changeText}>{text}</button>
            </div>
            
        );
    }

    export default App;

Definimos uma função que muda o valor do text e chamamos essa função com o evento onClick do botão, porém nad acontece. Vale lembrar que trocamos o Component Button para a tag HTML padrão button.

Para entendermos o porque nosso text do botão não muda temos que entender o mecanismo de renderização no React.

O React basicamente precisa de um gatilho para que haja essa atualização do texto.

Somente as alterações de props e a alteração de estado faz com que tenha esse gatilho de atualização.

Para que eu tenha uma variável onde, toda vez que essa variável mude a página recarregue também com esse novo valor, ou seja, atualize, não podemos utilizar variáveis comuns como o let. Esse valor tem que ser um valor de prop ou um valor deestado.

Para isso vamos utilizar o estado (states), para utlizar o estados no React fazemos o seguinte:

*Hooks é uma função que traz algumas funcionalidades para o React* 

Vamos utilizar um Hook de estado que é o useSate() e temos que import-alo do React.

App.js:

import './App.css';
import { useState } from 'react'

// import Button from './components/Button';

    function App() {

        let [text, func] = useState('Click Me!!')

        function changeText() {
            func('Clicado')
        }

        return (

            <div className="App">
            <button onClick={changeText}>{text}</button>
            </div>
            
        );
    }

    export default App;

Bomo o hook de estado ele tranforma nossa variavel em um array e uma função, exemplo:

    let teste = useSate()

    console.log(teste)
    //output: [], f

Então como se trata de um array podemos desestruturar ele:

    let [ teste, function ] = useState()

Por padrão esse código já vai dar erro, pois não definimos ainda um valor para a variável teste:

    let [ teste, function ] = useState('Texto qualquer')  

Agora nos definimos que a variável teste tem o valor de 'Texto qualquer'.

Para fazer com que ao mudar o valor da variável teste e atualizar a página devemos devemos atribuir o novo valor da variável teste à sua função, que nesse caso chamamos de function, mas poderia ter qualquer nome.

    function('Trocamos o valor aqui!!')

Também devemos usar a boa prática de que o valor da funçõ seja escrito com set + o nome da variável que ela alter ficando:

    let [ teste, setTeste ] = useState('Texto qualquer')

Então após esse ensinamentos temos como código até o momento:

App.js:

    import './App.css';
    import { useState } from 'react'

    // import Button from './components/Button';

    function App() {

        let [text, setText] = useState('Click Me!!')

        function changeText() {
            setText('Clicado')
        }

        return (

            <div className="App">
            <button onClick={changeText}>{text}</button>
            </div>
            
        );
    }

    export default App;


