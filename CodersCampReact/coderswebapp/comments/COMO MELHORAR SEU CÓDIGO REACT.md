# COMO MELHORAR SEU CÓDIGO REACT

- Tudo se resolver melhor quando você domina a base da linguagem que estamos atuando.

1. Organização das declarações.

Regra para melhor performace e organização:

- Tudo que não depender de estado ou de props a gente coloca fora do componente.

Exemplo:

    const a = 2 * 2;

Essa variável não depende de props nem de estado do componente, então pode deixá-la fora do componente. (fora do App() {return()}).

As funções que forem viáveis, sempre é bom deicxar elas de maneira pura, ou seja, fora do componente e quando precisarmos passar algum parâmetro de props, chamamos a função normal (function(prosA, propB)). Com isso temos mais performace, mas é claro tudo depende também da quantidade de parâmetros que temos que passar para fução e quais são as dependencias dessa função.

2. Evite definir funções inline nos componentes.

Exemplo:

Maneira comum:

    onChage={nomeDaFunção}

Com função anônima:

    onChange={() => nomeDaFunção()}

Da segunda maneira, toda vez que houver uma renderização a função será recriada.

Toda função que a gente passa de um componente para o outro vai gerar essa renderização.

Como resolver esse problema? (Com o próximo passo)

3. Domine a utilização dos Hooks.

Temos dois Hooks que podemos resolver esse problema, o useMemo(() => {}, []) e o useCallback(() => {}, []).

Exemplo useMemo():

    const value = useMemo(() => {
        return 115616516161 * 1651561615616 + numberA(Esse valor seria uma props então não podemos deixar essa const fora do componente!)
    }, [numberA])

Aqui basicamente ele vai renderizar uma vez e só ser renderizado novamente se tivermos uma alteração na prop numberA.

Exemplo useCallback():

Esse Hook vai resolver nosso problema das funções.

Maneira com menos performace:

Fora do componente:

    function deleteTodo(id) {
        setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
    }

Dentro do componente:

    oncChange={deleteTodo}

Maneira mais perfomática:

Fora do componente:

const deleteTodo = useCallback((id) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id)); 
}, [])

Dentro do componente:

    onChange={deleteTodo}

Dessa maneira mesmos as funções sendo passadas para outro componente através das props não haverá masi reenderização das funções por conta do Hook useCallback(), basicamente esse Hook ele guarda uma referência da função em memória e com isso não precisa ficar recriando ela.

Quando utilizamos de maneira correta os Hooks teremos muito mais performace e também um código mais limpo.

Utilzamos isso quando queremos fazer um map por exemplo. A melhor maneira é utilizar o map, mas separar seu código html em um componente e passar a função que pega determinado id por exemplo através de props, dessa maneira evitamos a função anônima dentro do props. 


4. Evite múltiplos componentes em um só arquivo.

Se utilizarmos um microcomponente dentro de outro componente devemos salv-alo em um arquivo diferente nem que seja na mesma pasta do arquivo principal. Nunca criar um dois componentes em um memso arquivo.


5. Evite os derived states (estados derivados).

Não podemos ficar criando renderizações desnecessárias.

A maioria dos estados que dependem de outros estados podem ser resolvidos com o useMeno().


6. Evite o prop drilling

Esse conceito de prop drilling é quanod estamos passando uma props só para repassar para outro componente.

Para resolver isso, em vez de ficar passando uma prop de pai para filho diversas vezes, devemos utilizar um contextApi ou zustand, que são uma ferramenta de gerenciamento de estado.

Então basicamente essa props vem de um componenete origem, exemplo componenente A, e vai para o zustand, e todos os outros componentes que precisarrem dessa props vão ter que buscar do Zustand.

