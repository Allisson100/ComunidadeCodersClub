# Classes

Vou criar um novo componente chamado User e no arquivo index dele digitamos:

Para entendermos mais afundo as classes temos que estudar programação orientada a objeto.

    Class User {}

    const user = new User()

Não é essa a sintaxe correta, mas as classes são moldes para um objeto.

    class User {
        name: string;
        age: number;

        constructor(name: string , age: number) {
            this.name = name
            this.age = age
        }

        logUser() {
            console.log(this.name);
        }

        save() {
            //Salvar o usuário no banco de dados por exemplo
        }
    }

    const user = new User('Allisson' , 22)
    user.logUser()

Exemplo de uma classe.

Antigamente o React era utilizado com o conceito de classes e é quase ctz que se você estiver trabalhando com React em algum momento você vai ver esse conceito.

Exemplo de componente no modo antigo do React:

    import { Component, ErrorInfo, ReactNode } from "react";

    interface Props {

    }

    interface State {
        signed: boolean;
    }


    export default class User extends Component<{}, State> {
        constructor(props: Props) {
            super(props)

            this.state = {
                signed: false,
            }
        }

        componentDidMount(): void {
            //Executa uma vez quando o componente é montado semelhante ao useEffect
            //Utilizava para fazer requisição à API ou algum calculo.

            //Alterar o estado
            this.setState({ signed: true})
        }

        componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
            //Se desse um erro no componente, poderiamos utilziar isso para evitar aquela tela branca e afins.
            //Ainda hoje não temos uma alternativa para essa função no React 'Recente'
            //Conhecido como Error Boundary

            //Mas hoje em dia podemos envolver todo nosso código em um error boundary semelhante a um provider. Criamos esse arquivo na raiz do projeto e nesse arquivo utlizamos classe com essa função e conseguimos tratar esse tipo de erro.
        }

        componentWillUnmount(): void {
            // Qunado o nosso componente vai desmontar
            //Também muito utilizado para remover listener
        }

        render(): ReactNode {
            return (
                <div>{this.state.signed}</div>
                // <div>{this.props.children}</div>
            )
        }
    }
