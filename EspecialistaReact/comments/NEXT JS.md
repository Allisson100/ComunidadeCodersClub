# Next Js

- Ele era uma ferramenta que de fato resolvia um problema.

- O Next é um ferramenta de SSR/SSG para o React.

- SSR: Server Side Rendering

/view - template engine (Foi oq eu fiz utilizando o NodeJS e o Handlebars).

O Next js cria um servidor Node e nosso front end React roda dentro desse servidor para que dessa forma a gente não tem mais a problemática da aplicação não conseguir rodar sem javascript.

Entõ o fluxo fica mais ou menos assim:

Usuário -> Node(NextJS) -> <- FrontEnd -> API

Para criar um projeto com next vamos digitar no terminal:

    npx create-next-app nx

Podemos usar yarn tbm.

O Next JS já vem com a parte de rotas configurada. Dar uma olhada na documentação, pois mudou um pouco comparada com o vídeo.

Eu tive que usa routra versar do Next, pois ainda não encontrei nenhum curso mais recente falando sobre o novo Next:

    npx create-next-app@9.1.3 nx

Temos que adicionar o typescript também, basicamente nós mudamos os arquis .js para .tsx e utilizamos o seguinte comando:

    yarn add --dev typescript @types/react @types/node

# Volltando para aula

Código do arquivo user.tsx:

    import { GetServerSideProps } from "next"

    export default function User ({ username }) {
        return (
            <div>
                user: {username}
            </div>
        )
    }

    export const getServerSideProps: GetServerSideProps = async() => {
        return {
            props: {
                username: 'Allisson'
            }
        }
    }

Dessa forma conseguimos utilizar props do servidor.

Podemos também pegar dados de alguma API, exemplo:

    import { GetServerSideProps } from "next"

    export default function User ({ username }) {
        return (
            <div>
                user: {username}
            </div>
        )
    }

    export const getServerSideProps: GetServerSideProps = async() => {

        const resp = await fetch('http://api.github.com/users/CarlosLevir')
        const data = await resp.json()

        return {
            props: {
                username: data.name
            }
        }
    }

A parte legal é que quando a gente desabilita a função do javascript lá no debugger e ecarregamos a página o conteúdo continua lá.

Temos que utilizar essa parte de getServerSideProps se fazer sentido, por exemplo nesse caso faz sentido carregar alguns dados da api, pois queremos mostrar o nome do usuario logo quando a página carrega, mas se por algum motivo nós precisamos pegar dados de uma api somente quando o usuário clica no botão por exemplo, não faz sentido utilizar o getServerSideProps, faz mais sentido utilizar a forma tradicional com useCallback ou useEffect.

Lembrando que essas funções como o getServerSideProps, são apenas usadas na inicialização do componente.

Temos uma ferramenta chamada Gastby que surgiu com a ideia de ser um gerador de site estático, ele transforma nosso site dinamico em um site estático.

E o next basicamente copiou essa ideia e agregou essa questão de sites estáticos no Next.

Vamos criar um arquivo chamado usuário.tsx que vai ser no página estática que é o SSG: Static Side Generating.

No arquivo usuario.tsx digitamos:

    import { GetStaticProps } from "next"

    export default function Usuario ({ username }) {
        return (
            <div>
                user: {username}
            </div>
        )
    }

    export const getStaticProps: GetStaticProps = async() => {

        const resp = await fetch('http://api.github.com/users/CarlosLevir')
        const data = await resp.json()

        return {
            props: {
                username: data.name
            }
        }
    }

No ambiente de desenvolvimento isso irá funcionar da mesma forma que a página User mesmo trocando os nomes das funções, mas quando a gente for buildar o projeto ele vair criar uma página estática, ou seja, ele vai na API do git hub, vai fazer a página tudo certo e depis disso ele vai criar um arquivo estático disso.

A diferença de um para outro vai ser no resultado final. Com o getStaticProps ele vai gerar nossa página de forma estática, ele é recomendável em casos em que a página não vai alterar muito.

Exemplo a página About(sobre), dificilmente ele é alterada então podemos utilizar o static, mas no caso de uma página que faz a listagem de notícias do G1 ou um ecommerce que tenha 20mil produtos, como que vamos gerar isso estaticamente, não vale a pena então seria melhor usar o server side.

Lembrando que podemos ter ambas as funções em nosso projeto, qual utilizar realmente vai depender da página que estamos desenvolvendo.

No node quando vamos utilizar de algum parametro na rota utilizamos algo desse tipo:

    route.get('/users/:id')
                ou
    route.get('/users/:username')

Esse id e username são exemplos de parametros que conseguimos passar para rota e conseguimos fazer isso também com o NextJS, por isso criamos um arquivo chamdo [user].tsx. Esse user entre parenteses é o nome do parâmetro.

Vale lembrar que no primeiro carregamento nós não teremos aqueles códigos de javascript como o window e document, isso de primeiro momento e também isso não funciona nas funções de SSR e SSG.

Um código legal de utilizar é:

    const isBrowser = typeof window !== 'undefined'

Isso é basicamente é uma verificação para caso precisarmos utilizar esses códigos como window e document.

Volatndo para parte de parametro na pagina [user].tsx digitamos:

    import { GetServerSideProps } from "next"

    export default function User ({ username }) {
        return (
            <div>
                user: {username}
            </div>
        )
    }

    export const getServerSideProps: GetServerSideProps = async({ params }) => {

        const {user} = params

        const resp = await fetch(`http://api.github.com/users/${user}`)
        const data = await resp.json()

        return {
            props: {
                username: data.bio
            }
        }
    }

Dessa forma toda vez que digitarmos http://api.github.com/users/${nome_do_usuario}, ele irá pegar as inofrmações desse usuário através da rota, mas isso é no caso do getServerSideProps.

Vamos ver agora se nós quisessemos utilizar do getStaticProps para pegar esses parâmetros:

    import { GetStaticPaths, GetStaticProps } from "next"

    export default function User ({ username }) {
        return (
            <div>
                user: {username}
            </div>
        )
    }

    export const getStaticPaths: GetStaticPaths = async() => {
        return {
            paths: [
                {
                    params: {
                        user:'CarlosLevir'
                    }
                }
            ],
            fallback: 'blocking'
        }
    }

    export const getStaticProps: GetStaticProps = async({ params }) => {

        const {user} = params

        const resp = await fetch(`http://api.github.com/users/${user}`)
        const data = await resp.json()

        return {
            props: {
                username: data.bio
            }
        }
    }

Podemos criar uma api também, mas só é utilizada em casos muito específico, bast criar uma pasta api dentro da pasta pages e dentro dela criamos um arquivo hello.js e dentro dele digitamos:

    export default (req, res) => {
        res.status(200).json({nme: 'John Doe'})
    }

E ara acessá-lo basta digitar localhost:3000/api.helo.
