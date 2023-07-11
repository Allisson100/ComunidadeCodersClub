# GUIA do JS e ES6+

Ele fala o báscio do JavaScript.

Boa prática sempre utilizar let e const.

    function soma (A, B) {
        return A + B
    }

É a mesma coisa que:

    const novaSoma = (A, B) => A + B

Para mudar atributos dentro do elemento podemos utilizar o .setAttribute('atributo que quer mudar', 'valor que quer mudar'), exemplo: 

    const inp = document.getelementById('inp')

    inp.setAttribute('placeholder', 'teste')

Para adicionar o remover classes utilizamos o classList, exemplo:

    inp.classList.add('teste')
    inp.classList.add('teste02')

    //class="teste teste02"

    inp.classList.remove('teste02')

    //class="teste"

Para criar elementos:

    const body = document.querySelector('body')

    const h1 = document.createElement('h1')
    h1.innerText = 'Criado aqui'

    body.append(h1)

Para remover, exemplo:

    h1.remove()

Classe - Estudar mais sobre.

### Promisse

Podemos usar o then() e o catch para fazer a requisiçõ de alguma api.

Mas atualmente com o ES6 utilizamos o async await, exemplo:

    async function gitHub () {

        try {
            const resp = await fetch('URL')
            const data = await resp.json()

        } catch (err) {

        }
    }

Se fosse arrow function:

    const gitHub = await () => {

        try {
            const resp = await fetch('URL')
            const data = await resp.json()

        } catch (err) {

        }
    }

Criando Promisses, exemplo:

const pro = new Promisse (async (resolve, rejected) => {
    const resp = await fetch('URL')
    const data = await resp.json()

    resolve(data)
    reject({ message: 'Deu erro' })
})

async function getGitHubUser() {
    try {

        const data = await pro

    } catch(err) {

    }
}

### Destruturação

    const obj = {
        nome: 'Allisson',
        idade: 22
    }

    const obj2 = {
        cpf: '123',
        obj
    }

// A saida aqui vai conter um objeto dentro de utro objeto.

Para adicionarmos o conteúdo de um objeto dentro do outro fazemos:

    const obj2 = {
        cpf: '123',
        ... obj
    }

// Desssa maneira teremos dentro do obj2 o campo cpf e ainda todos os outros campos contidos no obj enão um objeto dentro do outro.

Para destruturar um objeto fazemos:

    const obj = {
        nome: 'Allisson',
        idade: 22
    }

    const { nome } = obj

Isso é o mesmo que fazer:

    const nome = obj.nome

Podemos destruturar um array também, vale lembrar que a posição importa já o nome não, exemplo:

    const arr = [
        'Allisson',
        'Matheus',
        'Souza'
    ]

    const [Nome1, Nome3] = arr

    //sída: Allisson, Mathues.

Tem a saida com Matheus e não Souza, pois como eu disse o nome não importa e sim a posição do elemento no array.

Podemos também utilizar o rest:

    const obj = {
        nome: 'Allisson',
        idade: 22
    }

    const {nome, ... rest} = obj

    console.log(rest)
    //{idade:'22'}

Os primeiros nomes são os itens que qeuremos retirar do array ou objeto e ... rest seria o que restou do array.











