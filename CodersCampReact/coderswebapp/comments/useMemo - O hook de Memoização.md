# useMemo | O hook de Memoização

Se a gente está usando o memo na hora da exportação do componente, como já vimos ele so vai ser rerenderizado se houver atualização em sua prop.

Porém caso usarmos um prop de um obejto vazio ele vai entender que está sendo feita uma mudança e sempre vai rerenderizar o componente. Exemplo:

    <Label text={{}}/> //Pasamos como prop um objeto vazio.

Isso acontece por conta de uma regra do JavaScript, que é a regra de comparação, como o JavaScript compara os objetos um com o outro, como ele compara as variáveis uma com a outra.

Dentro da programação temos dois tipos principais de comparação:

- Deep (profundo)
- Shallow (raso)

Comparação do tipo rasa e profunda.

A comparação do tipo Shallow ela não verifica cada propriedade de um determinado objeto, ela só vai verificar se os objetos tem a mesma referência. Ou seja, {} === {} sempre será falso, pois essa comparação é do tipo Shallow.

Agora a comparação do tipo Deep sempre verifica campo por campo dentro do JavaScript, para verificar se todos os campos do objeto são iguais.

Essa comparaçõ não acontece de forma padrão aqui no JavaScript, caso quisermos utilizá-la temos que nós mesmo criar a nossa função para fazer essa comparação de campo por campo.

No Javascript essas comparções de arrays, obejtos e funções sempre irão retornar falso por causa do endereço de memória.

Porém temos alguma formas de resolver isso.

A primeira delas é utilizar aquele segundo parâmetro do memo para fazer essa comparação do campo por campo, porém não é uma forma muito legal de fazer.

A segunda maneira é através do useMemo, nosso Hook de memoização.

Memoização já existe a muito tempo, e é basicamente a gente salvar o resultado de alguma operação custosa para nós não precisarmos fazer essa operação sempre. Vamos supor que essa operação custe processamento, então por ser uma operação custosa, podemos utilizar  memoização, ou seja, salvar um cache desse valor e sempre utilizar esse valor cacheado e não precisamos mais fazer essa operação novamente.

O Hook useMemo resolve esse primeiro problema da comparação e também resolve esse problema das operações custosas.

useMemo(), recebe dois parâmetros, que são uma função e um array de dependências que nem o useEffect, mas nesse caso ele nos retorna um valor.

    const value = useMemo(() => {
        return {}
    }, [])

    return (

        <div className="App">
            <Label text={value}/>
            <Button onClick={changeText}>{text}</Button>
        </div>    
    );

A principal idéia do useMemo é primeiramente, permitir com que a gente passe props como valores memoizados e assim evita aquela comparação shallow.

E também utilizamos o useMemo quando queremos salvar resultados de operações custosas dentro da aplicação.

Exemplo:

    let resultado = 14451451619841981 * 1651564165156156165

Esse cálculo será executado toda vez que houver alguma atualização no componente pai. O que pode ser custoso a performace do componente. O que podemos fazer é:

    const resultado = useMemo(() => {
        console.log("hehehe");
        return 14451451619841981 * 1651564165156156165
    }, [])

Agora o valor da const resultado é o valor da conta, porém só será feito uma vez.














