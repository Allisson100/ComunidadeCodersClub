# Funções de callbacks junto do estado

Initial state é o parâmetro inicial que damos para o a variável de estado.

Podemos usar cocatenações, template string e até contas matemáticas como parâmtro do useState.

Mas podemos passar para ele também funções. Exemplo:

    const [label, setLabel] = useState(() => {
        //Operação 1
        //Operação 2

        return 'Valor da variável'
    })

Podemos executar condições ou loops aqui também, diversas coisas.

Podemos por exemplo buscar os valores de um local storage e retornar esse valor.

