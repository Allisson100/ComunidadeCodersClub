# useEffect | O hook de ciclo de vida

Sempre quando acontece um renderização do estado ou da props de um componente o nosso componente ele atualiza.

Essa atualização basicamente significa que nosso componente inteiro vai ser recriado do zero.

A cada reatualização, cada linha de código DENTRO do componente será recriado.

Exemplo para ver tal comportamento:

    function App() {

        let [text, setText] = useState('Click Me!!')

        function changeText() {
            if (text === 'Click Me!!') {

                setText('Clicado')
            } else {
                setText('Click Me!!')
            }
        }

        console.log('Renderizou de novo');

        return (

            <div className="App">
                <Button onClick={changeText}>{text}</Button>
            </div>    
        );
    }


O useEffect vem para permitir com que a gente escolha os momentos em que a gente vai querer executar feitos colaterais aqui dentro do nosso componente.

Digamos que eu não queira executar o console.log('Renderizou de novo') a cada nova renderização. Eu quero escolher os momentos em que esse console vai acontecer. 

O useEffect() não nos retorna nada, mas ele permite dois parâmetros, uma função que normalmente é usada uma arrow function e um segundo parâmetro que é um array.

Esse array é chamdo de array de depndências (Dependency Array).

Na função a gente tem que colocar o código que vai ser executado. Pode ser qualuqer código.

Geralmente o useEffect() é utilizado para chamadas de API. 

Exemplo:

    useEffect(() => {
        console.log('Renderizou de novo Dois');
    }, [])

Dessa maneira ele só executa o console.log uma vez. Na código em cima ele executava toda vez que o texto do botão mudasse.

Uma carcterística desse Hook é que ele vai executar uma vez na criação do componente, no momento da transição do estado de Unmounted para Mounted, somente essa vez, é obrigatório ser executado.

Porém, ele pode ser executado outras vezes caso a gente defina. Para fazer isso digitamos:

    useEffect(() => {
        console.log('Renderizou de novo Dois');
    }, [text])

Basicamente estamos dizendo que, toda vez que a variável text atualizar eu quero que o useEffect() seja executado.

Podemos colocar quantas dependecias quisermos, todas vez que uma dessas dependencias serem modificadas o useEffect() será executado.

Existe um macete para usarmos funções assíncronas dentro de um useEffect().

Vale lembrar que o primeiro parâmetro do useEffect() é uma função callback e o segunda é um array de dependências.

Para utilizarmos uma função assíncrona, não podemos colocar ela diretamente dentro do useEffect().

Prcisamos criar uma função assincrona dentro da função de callback, exemplo:

    useEffect(() => {
        async function loadUsers() {
            await //código ...
        }

        loadUsers()
    }, [])

Podemos retornar alguma coisa do useEffect(), mas tem que ser uma função.

Podemos usar esse hooke de efeito quando nosso componente vai ser desmontado.

Então quando esse componente for parar de existir, nós podemos ter uma função que vai executar antes do componente ser desmontado, exemplo:

    useEffect(() => {

        return () => {

        console.log('Saiu da página');
        }
    }, [text])

Porém tem algo importante e meio confuso de aprender sobre esse retorno.

Caso o array de dependências for vazio o retorno do useEffect() vai retornar normal conforme a explicação.

Caso exista variáveis em nosso array de dependências esse retorno vai ser executado sempre antes do próximo efeito ser executado.

Para explicar melhor. Basicxamente toda vez que a variável dentro do array de dependências for atualizada ele irá executar o useEffects novamente e como temos a função de retorno lá, ela também será executada.

Esse retorno geralmente é utilizado quando a gente vai definir algum listener ou algum timer.

Exemplo:

    useEffect(() => {
            addEventListener('')
        return () => {
            removeEventListener
        }
    }, [text])

Lembrando que quando adicionamos um eventListener temos que remove-lo.









