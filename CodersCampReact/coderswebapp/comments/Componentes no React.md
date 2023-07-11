# Componentes no React

Vamos criar uma pasta components dentro da pasta src e lá vamos guardar nossos componentes.

Vamos criar dentro da pasta um arquivo chamado Button.js.

Todo componente é uma função

Os nomes dos componentes tanto no arquivojs dele tanto na função tem que estar com a primeira letra maiúscula.

Button.js:

    export default function Button () {
        return <button>Click me !</button>
    }

Se eu tivesse vários elementos nesse componente ai eu deveria usar obrigatoriamente o return com parenteses, exempo:

    export default function Button () {
        return (
            <div>
                <button>
                    Click me !
                </button>
            </div>
        )
    }

App.js: 

    import './App.css';

    import Button from './components/Button';

    function App() {
    return (
        <div className="App">
        <Button></Button>
        </div>
    );
    }

    export default App;

Nos componentes sempre devemos ter somente uma tag pai exemplo o Button.

Forma correta:

    export default function Button () {
        return (
            <div>
                <button>
                    Click me !
                </button>
            </div>
        )
    }

Forma errada:

    export default function Button () {
        return (
            <div>
                <button>
                    Click me !
                </button>
            </div>
            <section>
                conteúdo
            </section>
        )
    }

O export default eu posso ter um por arquivo e não importa o nome na hora que eu for importar.

E o export (Named Export) normal eu posso fazer export de varias funções diferentes de um mesmo arquivo, mas na hora do import eu tenho que colocar o mesmo nome e colocá-los entre chaves.


