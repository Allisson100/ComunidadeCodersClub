# Styled Components

Styled Components é uma ferramenta utilizada pelo React e é um conceito chamado de CSS in JS.

Temos outra ferramenta também semelhante que se chama Emotion que traz essa mesma ideia de Css in JS.

Para adiconar o styled components no projeto vamos digitar no terminal:

    npm install styled-components @types/styled-components

Temos que installar também os tipos por conta do typescript, toda biblioteca que precisamos instalar temos que instalar também os tipos e a nomenclatura mais padrão é @types/nomeDaBiblioteca.

Agora para cirar os estilos vamos criar um novo arquivo dentro da nossa pasta de componentes chamado styles.ts e nele digitamos:

    import styled from "styled-components";

    export const Container = styled.div`
        width: 100%;
        height: 100%;
        background-color: #000;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `

Não podemos esquecer de importar styled da biblioteca styled-components e depois criamos basicamente um componente com estilos, agora lá no index.tsx digitamos:

import './index.css'

import \* as Styles from './styles'

    const SingIn: React.FC = () => {

        return (
            <Styles.Container className="sign-in-page">
                <img src='https://cdn-icons-png.flaticon.com/512/552/552250.png' alt="CL Logo" />
                <input type="text" defaultValue="test@email.com"/>
                <input type="password" defaultValue="12345678"/>
                <button onClick={() => {}}>
                    Entrar
                </button>
            </Styles.Container>
        )
    }

    export default SingIn

Utilizamos esse componente com estilos no lugar da div e ele basicamente pega a estilização que a gente fez. Temos que importar dessa forma: import \* as Styles from './styles'.

Agora vamos fazer a estilização dos outros componentes:

    import styled from "styled-components";

    export const Container = styled.div `
        width: 100%;
        height: 100%;
        background-color: #000;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `

    export const Logo = styled.img `
        width: 100px;
        margin-bottom: 1rem;
    `

    export const Input = styled.input `
        padding: 10px;
        border: 2px solid #ff2748;
        max-width: 80%;
        width: 20rem;
        height: 2.5rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    `

    export const Button = styled.button `
        border: 0;
        max-width: 80%;
        width: 20rem;
        height: 2.5rem;
        background-color: #ff2748;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;

        &:hover {
            transform: scale(1.01);
        }

        &:active {
            transform: scale(0.99);
        }

    `

Para utilizarmos as pseudoclasses utilizamos o &.

E no arquivo index.tsx temos:

    import { Container , Logo , Input , Button } from './styles'

    function SignIn () {

        return (
            <Container>
                <Logo src='https://cdn-icons-png.flaticon.com/512/552/552250.png' alt="CL Logo" />
                <Input type="text" defaultValue="test@email.com"/>
                <Input type="password" defaultValue="12345678"/>
                <Button onClick={() => {}}>
                    Entrar
                </Button>
            </Container>
        )
    }

    export default SignIn

Agora precisamos fazer os estilos do arquivo index.css que está na pasta src.

Vamos criar uma pasta styles na raiz do projeto. Dentro dessa pasta vamos criar um arquivo chamado global.ts e é nele que vai ficar os estilos globais porém com styled components.

Antes de fazer o código global. O styled component tem a vantagem de conexão entre código lógico e código css muito melhor exemplo, caso tenhamos uma classe chamada disabled onde ela recebe true ou false e caso for false ele vai manter a cor padrão do botão se for true vai ser green a cor do botão, fazemos isso da seguinte forma:

    <Button onClick={() => {}} disable={false}>
        Entrar
    </Button>

Styled Component:

    export const Button = styled.button `
        border: 0;
        max-width: 80%;
        width: 20rem;
        height: 2.5rem;
        background-color: ${({ disabled }) => (disabled ? 'green' : '#ff2748')};
        border-radius: 4px;
        color: #fff;
        cursor: pointer;

        &:hover {
            transform: scale(1.01);
        }

        &:active {
            transform: scale(0.99);
        }

    `

Dessa forma conseguimos criar condições para trocar algumas alguns estilos de forma bem fácil.

E para no arquivo global.ts fica assim:

    import { createGlobalStyle } from "styled-components";

    export default createGlobalStyle`
        #root {
            width: 100vw;
            height: 100vh;
        }

        * {
            margin: 0;
            box-sizing: border-box;
            outline: 0;
        }
    `

Utilzamos um elemento direto do styled component que serve exatamente para estilos globias que é o createGlobalStyle.

Dentro do arquivo App.tsx importamos o css global, mas devemos usar ele como um componente:

    import GlobalStyles from './styles/global'
    import SignIn from './pages/SignIn'

    function App() {
    return (
        <>
        <GlobalStyles />
        <SignIn />
        </>
    );
    }

    export default App;

### Como trabalhar com temas dentro do styled components.

O tema são algumas configurações globais que a gente vai utilizar no nosso código para que a gente consiga ter um reusabilidade de código maior e também para que seja mais fácil de manter depois. Isso é basicamente como criar variáveis css em um arquivo css normal. Para isso vamos criar um arquivo chamado theme.ts na pasta styles e nele digitamos:

    const theme = {
        default: {
            colors: {
                black: '#000',
                pink: '#ff2748',
            },
        },
    }

    export default theme

Criamos basicamente uma estrutura onde temos o theme default que vai ter as cores pink e preto e no nosso arquivo App.tsx exportamos ele:

import GlobalStyles from './styles/global'
import theme from './styles/theme'
import SignIn from './pages/SignIn'
import { ThemeProvider } from 'styled-components';

    function App() {
        return (
            <ThemeProvider theme={theme.default}>
                <GlobalStyles />
                <SignIn />
            </ThemeProvider>
        );
    }

    export default App;

Exemplos:

    import GlobalStyles from './styles/global'
    import theme from './styles/theme'
    import SignIn from './pages/SignIn'
    import { ThemeProvider } from 'styled-components';


    function App() {

    const newTheme = theme.default

        return (
            <ThemeProvider theme={newTheme}>
                <GlobalStyles />
                <SignIn />
            </ThemeProvider>
        );
    }

    export default App;

Podemos utilizar desse exemplo para através da const newTheme a gente pode buscar uma condição do tipo, caso o usuários estiver utilizando tema dark então nosso projeto vai utilizar o tema dark também esse tipo de coisa.

E utilizamos o ThemeProvider que já vem com o styled components e utilizamos ele para envolver todo nosso projeto e utlizar nosso temas.

Para utilizar essas cores de temas fazemos:

    background-color: ${({ theme }) => theme.colors.black};
