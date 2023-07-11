# Hooks customizados

Vamos criar uma pasta chamada hooks. Dentro dessa pasta vão ficar os hooks que criarmos e esses hooks seguem a mesma regra dos hooks padrões como por exemplo o uso do primeiro nome use (exemplo useState).

Vamos criar um arquivo chamado useConsole.tss para aprendermos mais e nele digitamos:

    export default function useConsole(text: string) {
        console.log(text)
    }

Agora no index de dashboard digitamos:

    import useConsole from '../../hooks/useConsole'
    import { Container , Logo } from './styles'


    function Dashboard () {

        useConsole('Teste')

        return (
            <Container>
                <Logo src='https://cdn-icons-png.flaticon.com/512/552/552250.png' alt="CL Logo" />
            </Container>
        )
    }

    export default Dashboard

Podemos iutilizar desses hooks personalizáveis quando por exemplo queremos acessar uma API várias vezes em páginas diferentes ai temos que setar algumas configurações. Nesse caso o melhor é configurar essa API em um hook e nos componentes que desejamos obter essas requisições da API nós sisplesmente chamamos o hook dela.
