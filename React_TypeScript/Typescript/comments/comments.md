# Entendo o TS, Vantagens e Desvantagens

O TypeScript foi criado com o objetivo de ser um superset (um conjunto de ferramentas) paa o JavaScript.
O TypeScript foi criado pela Microsoft.

Hoje em dia a maioria dos devs e inclusive a Microsoft consideram o tepyscript uma linguagem nova.

Principal características:

- Adicionar os tipos estáticos ao código javascript.
- Tudo é transpilado para javascript.

javascript:

    let text = 'a'
    text = 10

A idéia do typescript é justamente arrumar o tipo de coisa que acontece no código acima, não deixar uma variável mudar do tipo texto para o tipo número por exemplo.

Vantagens:

- Evita resultados inesperados.
- Ele ajuda você a entender o código.
- Permite à trabalharmos com as ultimas funcionalidades da linguagem.
- Ele ajuda no intellisense (inteligência do editor de texto).

Desvantagens:

- Queda na produtividade no processo de aprendizagem.

# Tipos

A extensão dos arquivos typescript é .ts.
E no caso do React utilizariamos .tsx.

Para instalar o typescript digitamos no terminal:

    npm install -g typescript

No typescript temos que tipar as variáveis com o tipo, exemplo:

    const string: string = 'texto'
    const booleano: boolean = true OU const booleano: boolean = Boolean(1) //1 é true e 0 false
    const numero: number = 10.5 // 0xfff(haxadecimal)

    const arr: string[] = [''] // Nesse array só pode ser passado strings

    OU

    const arr: Array<string> = [''] // Nesse array só pode ser passado strings

A diferença é que com o sinal de <> tem uma abordagem conhecida como generics.

    const tuple: [number, string] = [1, 'Nome'] //É semelhante ao array, mas na tupla já temos a quantidade de itens definidos e o tipo deles definidos também

    enum Theme {
        Dark = 'dark',
        Light = 'light'
    }
    //É um objeto com uma lista

    const any: any = {} // Aqui pode ser atribuido qualquer valor é como se não tivesse tipado, utilizamos ele em casos pontuais. Nesse caso eu posso definir a variável como uma string e depois atribuir um número por exemplo. Sempre evitar o ant, sempre que possível.

    let unknown: unknown = '' //Podemos atribuir qualquer valor aqui também. Se houver a possibilidade, sempre escolha o tipo unknown do que  tipo any, pois o tipo any é possível fazer operações, por exemplo com o split()

Os exemplos acima utilizamos em variável agora vamos ver os tipos que utilizamos em funções.

DICA: apenas tipe o que o typescript está pedindo para você tipar, pois a maiori das coiss ele entende.

    function sum (numberA: number , numberB: number): number {
        return numberA + numberB
    }

Aqui nós tipamos tanto os parâmetros como o retorno da função, mas não precisariamos tipar o retorno:

    function sum (numberA: number , numberB: number) {
        return numberA + numberB
    }

Pois ele já consegue saber que o retorno será um número.

    function teste (numberA: number , numberB: number): void {

    }

    function testeTwo (numberA: number , numberB: number): void {
        return undefined
    }
    // Tipo void é quando a função não vai retornar nada ou retorna undefined

    function testeThree (numberA: number , numberB: number): never {
        while (true) {

        }
    }

    // A função do tipo never ela nunca tem fim, ela vai rodar para sempre. Pode ser utilizadas em funções que geram algum erro

    let test = undefined
    let test2 = null

    const obj: object = {
        a: ''
    } //any dos objeto

# Interfaces

    interface User {
        nome: string;
        [key: string]: string;
    }

    interface PrintUserReturn {
        idade: number;
        cidade: string
    }

    function printUser(user: User) {
        console.log(user.nome)
        console.log(user.idade)

        return { idade: 22 , cidade: 'Fortaleza' }
    }

    //Interfaces são os principais para tipar objetos

Podemos utilizar [key: string]: string; para dizer que o campo será dinâmico.

    interface User {
        nome: string;
        idade?: string;
    }

Esse exemplo mostra que o campo pode ser obrigatório ou não.

Exemplo de array de objetos:

    interface Aluno {
        name: string;
        grade: number;
        status?: 'active' | 'inactive'
    }

    const Alunos: Aluno[] =  [
        {name: 'Allisson', grade: 10, status: 'active'},
        {name: 'Allisson', grade: 10, status: 'active'},
        {name: 'Allisson', grade: 10},
        {name: 'Allisson', grade: 10, status: 'inactive'},
    ]

# Utility types

Toda vez que utilizamos a sintaxe de <>, estamos trabalhando com generics.

    interface GithubUserData {
        followers_url: string;
        following_url: string;
        //Diversos outros dados da API DO GITHUB aqui
    }

    function printGitHubUserData(user: GithubUserData) {
        console.log(user.followers_url);
        console.log(user.following_url);
    }

Vamos supor que temos essa situação, a API do GitHub nos retornar diversos dados do usuário, mas na função só utilizamos dois dados, como podemos resolver isso?

Para isso que temos os utilities type.

### Pratial

    interface GithubUserData {
        followers_url: string;
        following_url: string;
        followers: string;
        //Diversos outros dados da API DO GITHUB aqui
    }

    function printGitHubUserData(user: Partial<GithubUserData>) {
        console.log(user);
    }

    printGitHubUserData({ followers: '' })

Podemos usar o Partial, mas o problema aqui é que não consigo dizer aqui quais campos que eu quero, mas para resolver isso digitamos:

### Pick

    //Pick
    function printGitHubUserDataPick(user: Pick<GithubUserData, 'followers' | 'following'>) {
        console.log(user.followers);
        console.log(user.following);
    }

    printGitHubUserData({ followers: '' , following: '' })

Desse modo evitamos que a pessoa tenha que passar todos os dados da API do Github para a função, essa função tem apenas dois parâmetros obrigatórios que é o followers e o following.

### Omit

Temos também o Omit, ele ao contrário do Pick ele omite alguns dados que você queira no parâmetro da função:

    //Omit
    function printGitHubUserDataOmit(user: Omit<GithubUserData, 'followers'>) {
        console.log(user.following);
    }

Aqui nesse caso eu vou obter todos os dados da API do GitHub e utilizá-los na função, mas como eu não utilizao o dado followers eu omito ele. Lembrando que caso eu nõ use Pick ou Omit eu tenho que passar 100% dos dados para a função.

### Readonly

    const newGitHubUser: Readonly<GithubUserData> = {
        followers: '190',
        following: '190',
    }

    newGitHubUser.followers = '200'

Desse modo estamos dizendo que o objeto newGitHubUser tem os dados somente para leitura e que não podemos alterá-los.

Podemos fazer esse conceito de outra maneira também:

    interface GithubUserData {
        readonly followers: string;
        following: string;
        //Diversos outros dados da API DO GITHUB aqui
    }

Dessa maneira não conseguimos também alterar o valor dessa variável, o typescript vai acusar um erro.

# Generics

Os Generics são funcionalidades que permitem a pasagem de tipos.

    function print<T>(param: T) {
        console.log(param);
    }

    function printNumber(number: number) {
        print<number>(number)
    }

    print<string>('text')

Quando passamos uma letra solta na função queremos dizer que quem está chamando a função vai definir qual é o tipo do paraâmetro da função. Foi isso que nó fizmeos:

    function print<T>(param: T) {
        console.log(param);
    }

Definimos o tipo como generics e depois:

    print<string>('text')

E depois chamamos essa função identificando o tipo que é uma string.

E no outro caso eu utilizei uma função para chamar a função print passando outro parâmetro:

    function printNumber(number: number) {
        print<number>(number)
    }

Nomenclaturas padrões:

S - State
T - Type
K - Key
V - Value
E - Element

Vale lembrar que essas lebrar se tornam um tipo dentro do escopo da função, exemplo :

    function print<S>(param: S) {
        let value: S = param
        console.log(param);
    }

Exemplo do que seria um useState mais ou menos:

    function useState<S>(initialState?: S) {
        let state = initialState

        function setState(newState: S) {
            state = newState

            return state
        }

        return { state , setState }
    }

    const state = useState<number>(10)

Podemos também travar o tipo do generic:

    function useState<S extends number | string = string>(initialState?: S) {
        let state = initialState

        function setState(newState: S) {
            state = newState

            return state
        }

        return { state , setState }
    }

    const state = useState<number>(10)

Com o extends nós travamos o tipo generico em number ou string e além disso definimos como padrão o tipo string.

Dessa forma quando chamarmos o useState nõ precisamos informar quando o tipo for string, pois já é padrão e caso quisermos utilizar número ai devemos informar, mas valores bolleanos por exemplo, não vamos conseguir utilizar.

# Como tipar funções

    type Callback = (result: string) => void

    function printaAlgoNaTela(callback: Callback ) {

    }

    function callback(nome: string) {

    }

    printaAlgoNaTela(callback)

Não entendi muito bem, mas vou estudar depois.

# Migrando o projeto de JS para TS

Podemos abrir a documentação do CRA typescript e ver também.

Podemos tanto criar um projeto do zero já com o template do typescript ou adcionar os tipos em um projeto já criado.

Criando do zero:

    npx create-react-app my-app --template typescript

Adicionando:

    npm install --save typescript @types/node @types/react @types/react-dom @types/jest

E nesse caso devemos renomear o arquivo index.js para index.tsx.

E depois rodamos o npm start.

E depois renomeamos o arquivo App.js para App.tsx.

Após isso precisamos resolver os pequenos erros que vão aparecendo.

Começamos criando as interfaces fora do componente e utilizamos ela como generics para atribuir os valores que estão faltando.

Podemos ver também em alguns códigos uma maneira de forçar o typescript entender que o número 10 por exemplo é uma string:

    let string: string = ''

    string = 10 as unknown as string

Isso aqui é uma má prática, mas pode ser visto em alguns códigos.

O que podemos fazer no lugar é. Fora do componente:

    interface UserData {
        name: string;
        company: string;
    }

Dentro do componente:

    const [userData , setUserData] = useState<UserData>({} as UserData)

Dessa forma o objeto vazio não vai dar erro dizendo que está vazio, nós estamos basicamente refroçando que aquele objeto será do tipo UserData, ou seja, vai receber os elementos name e company, e dessa forma ele não da mais erro.

Podemos refazer esse mesmo exemplo de uma maneir melhor ainda que é atribuindo valores vazios a ele:

    const [userData , setUserData] = useState<UserData>({
        nome: '',
        company: '',
    })

Quando modificamos de js para ts, precisamos adicionar a biblioteca e também seus tipos, por exemplo:

    yarn(ou npm) add axios @types/axios

Normalmente é essa forma que instalamos o pacote e seus tipos.

### Como tipar as propriedades que vamos receber nos componentes

    import React from 'react'

    interface Props {

    }

    const Button: React.FC<{ text: string }> = () => {
        return <div />
    }

    export default Button

Esse React.FC é um generic do react, mas não vamos utlizá-lo, em vez disso vamos fazer:

    interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        children: React.ReactNode;
    }

    const Button = ({ children }: Props) => {
        return (
            <button>{children}</button>
        )
    }

    export default Button

    function teste () {
        return (
            <Button onClick={() => {}}>Hello</Button>
        )
    }

Nesse caso temos um exemplo de como podemos tipar uma função, pois no exemplo o botão pode ter diversos eventos diferentes não apenas o onCLick. Então dessa forma utlizamos o extends que significa que além da tipagem que a gente já fez na interface Props vamos ter também os tipos do React.ButtonHTMLAttributes<HTMLButtonElement>, dessa forma vamos ter os tipos do Props e caso quisermos atribuir alguma função no botão não teremos problema.

# Decorators

Na época essa função estava em fase de teste ainda, mas podemos nos deparar com isso no AngularJS.

Os decorators são basicamente formas da gente decorar o nosso elemento seja ela uma função, uma classe, etc, no estilo de uma anotação.

Para utilizá-lo precisamos habiltar a função "experimentalDecorators": true no arquivo tsconfig.json. Justamente por ser experimental. Caso você esteja em um projeto que não tenha as linhas comentadas para ativar no projeto, devemos adicionar a linha e instalar um plugin para funcionar.

    //Decorator

    function logger (target: any) {
        console.log(target.nome);
    }

    @logger
    class User {
        nome: string

        constructor() {
            this.nome = 'Allisson'
        }
    }

Basicamente o @logger decora a função de baixo e com isso na função logger faz um console log daquele elemento.

Estudar mais depois sobre o Decorator, pois ele não é muito utilizável, mas imprtante saber, pois existe algumas funções a mais nele que não vimos ainda.

# Type assertions

    // Type assertions - as

    const unk: unknown = ''

    const str: string = unk as string

Dessa forma conseguimos reatribuir um tipo para uma variável, nesse caso a const unk foi reatribuida para string.

    interface User {
        nome: string
    }

    const user: User = {} as User

Temos essa forma também, mas nesse caso, caso aconteça algo de inesperado, o nosso código pode 'crashar'.

    interface User {
        nome: string
        address: {
            street:string
        }
    }

    const user: User = {} as User

    user.address.street

Se a gente jogar esse dado para produção vai dar erro, pois no inicio do código estamos dizendo que a const user utiliza a interface User que no momento ainda é um obejeto vazio e que só apenas futuramente vai receber valores como nome e street. Então o código quebra.

    interface User {
        nome: string
        address: {
            street:string
        }
    }

    const user: User = {
        nome: '',
        address: {
            street: ''
        }
    }

Esse exemplo é o mais corrreto.
