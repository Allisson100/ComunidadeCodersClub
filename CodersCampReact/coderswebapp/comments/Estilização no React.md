# Estilização no React

Dentro da pasta components vamos criar um arquivo css comum com o nome Button.css.

Podemos utilizar o arquivo separado par fazer o css e depois importá-lo no componente:

Button.js:

    import './Button.css'

    export default function Button ({children, onClick}) {

        return (    
            <button onClick={onClick}>{children}</button>
        )

    }

Button.css:

    button {
        background-color: red;
    }

Como vimos no curso essa estilização pode dar conflito, pois setamos a estilização de maneira global, então nesse caso devemos utilizar arquele esquema de empacotar o componente em uma div e atribuir a ela uma class ou um id e fazer o css com hierarquia.

Podemos também utilizar o css inline:

    import './Button.css'

    export default function Button ({children, onClick}) {

        return (    
            <button onClick={onClick} style={{ color: 'red', marginTop: '100px' }}>{children}</button>
        )

    }

Detalhe ao camel case por se tratr de um objeto. marginTop.

### CSS Modules

Seria uma terceira opção e a melhor maneira mais padrão assim.

É um funcionalidade do css que nos permite trabalhar com css tradicional, mas em módulos e com isso conseguimos resolver a questão dos conflitos e da organização de projeto.

Par utlizar o CSS Modules vamos ter que renomer nosso arquivo de Button.css para Button.module.css.

Devemos também no arquivo CSS utilizar a classe agora.

E no arquivo de componentes devemos imortar esse css e linkar ele com a classe que criamos ficando (atarvés do className):

Button.module.css:

    .button {
        background-color: red;
    }

Button.js:

    import styles from './Button.module.css'

    export default function Button ({children, onClick}) {

        return (    
            <button onClick={onClick} className={styles.button}>{children}</button>
        )

    }

