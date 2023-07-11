# Como renderizar variáveis e objetos

A palavra class já é reservda para o JavaScript por isso qunado queremos utilizar alguma classe HTML temos que usar o className. 

E todas as funções e atributos que tem mais de uma palavra utilizamos o padrão Camel Case, exemplo: onClick.

Podemos ter acessos a propriedades de elementos através das props, exemplo: 

App.js:

    <Button id='id-do-button' label='email'></Button>   

Button.js:

    export default function Button (props) {

        console.log(props);
        //output: {id: 'id-do-button', label: 'email'}

        return (
            <>
                <button>Click me !</button>
                <span>obrigatorio</span>
            </>
        )
    }

Porém podemos desestrutrar essa props para pegar somente as propriedades que recisamos:

    export default function Button ({id}) {

        console.log(id);
        //output: id-do-button

        return (
            <>
                <button>Click me !</button>
                <span>obrigatorio</span>
            </>
        )
    }


É sempre importante passar a propriedade correta que o componente espera receber.

Se temos que passar algum código JSX devemos passar entre chaves exemplo:

String:

    <Button value='teste'></Button>

JSX:

    let teste = Click ME

    <Button value={teste}></Button>

Podemos também utilizar operadores de condição, exemplo:

    return (

        <div className="App">
        <Button label='Click ME!!'></Button>
        </div>
        
    );


    export default function Button ({label}) {

        return (    
            <button>{label || 'Qualquer outro texto!'}</button>
        )
        
    }


Todos os componentes rececem o atributo children onde nada mais tudo o que está escrito entre as tags, exemplo:

App.js:

    return (

        <div className="App">
        <Button>Clique aqui agora</Button>
        </div>
        
    );

Button.js:

    export default function Button ({children}) {

        return (    
            <button>{children}</button>
        )

    }

A tag children nos da mais liberdade no código, pois por exemplo poderiamos colocar uma tag img dentro ali do button.






