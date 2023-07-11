# Entendendo o Fragment

Quando nós tinhamos aquele problema de ter dois elemento pais no componente, nó tinhasmos que fazer uma gambiarra e colocar tudo em volta de uma div para que funcionasse corretamente, mas meio que nó ficávamos com um div morta no projeto que não servia para nada.

Mas o pessoal do React arrumou isso e nos deu a possibilidade de usar a tag Fragment que temos que importar do React e ela funciona como se fosse uma div comum:

    import { Fragment } from 'react'

    export default function Button () {
        return (
            <Fragment>
                <button>Click me !</button>
            <span>obrigatorio</span>
            </Fragment>
        )
    }

Dessa forma temos os elementos necessários em volta de aoenas uma tag pai e não teremos aquela div morta.

Podemos usar também essa tag Fragment de uma forma mais curta e sem precisar da importação:


    export default function Button () {
        return (
            <>
                <button>Click me !</button>
            <span>obrigatorio</span>
            </>
        )
    }

Dessa froma temos o mesmo resltado, mas de uma forma mais curta e com menos código.

