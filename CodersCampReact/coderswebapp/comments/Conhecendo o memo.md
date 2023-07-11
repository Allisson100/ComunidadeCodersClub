# Conhecendo o memo

Não é exatamente um Hook, mas é uma função que ajuda muito a trabalhar com performace no React.

Toda vez que o componente pai sofrer atualização (exemplo recarregar a página), os componentes filhos serão renderizados novamente.

Porem para melhorar a perfomace, ou seja, não tem por que um componente filho ser renderizado novamente se ele não sofreu nenhuma alteração.

Para isso temos uma função do React que se chama memo.

Ela vai fazer com que algum determinado componente do React só seja atualizado caso as props que ele está utilizando sejam recarregadas.

Se não forem atualizadas o componente não precisará sofrer uma rerenderização desnecessária

Para utilizar o memo basta:

Label.js: (Componente de exemplo Label)

    import { memo } from "react"

    function Label () {
        console.log('Atualizou')
        return (
            <label>Label aqui</label>
        )
    }

    export default memo(Label)

Basicamente é só exportar a função utilizando o memo. E não se esqueça de importá-lo do react.

Agora se utilizarmos uma props, o componente irá renderizar toda vez que essa prop mudar. Exemplo:

Label.js:

    import { memo } from "react"

    function Label ({ text }) {
        console.log('Atualizou')
        return (
            <label>{text}</label>
        )
    }

    export default memo(Label)

App.js:

    return (

        <div className="App">
            <Label text={text} />
            <Button onClick={changeText}>{text}</Button>
        </div>    
    );

O memo também pode receber um segundo parâmetro. O primeiro parâmetro é o componente e o segundo é uma função que é opcional.

Essa segunda função receb dois parâmetros, prevProps e nextProps, e nos retorna um valor booleano (true or false).

Se a gente nõ passar essa função como segundo parâmetro para o memo, o próprio React já vai fazer as comparações nessa sengunda função de parâmetro de forma automática, mas pode ser que queremos alguma lógica personalizada no memo.

Esse segundo parâmetro basicamente compara a prop atual com a prop aterior e caso os valores não forem iguais ela renderiza o componente e se for igual não renderiza novamente. Exemplo:

Label.js:

    import { memo } from "react"

    function propsAreEqual() {
        return false
    }

    function Label ({ text }) {
        console.log('Atualizou')
        return (
            <label>{text}</label>
        )
    }

    export default memo(Label, propsAreEqual)

App.js:

    return (

        <div className="App">
            <Label/>
            <Button onClick={changeText}>{text}</Button>
        </div>    
    );


Desse jeito sempre irá rerenderizar o componente, pois o valor do segundo parâmetro do memo é sempre falso.



