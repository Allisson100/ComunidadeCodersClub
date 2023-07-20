# Avançando NEXT JS

Quando fazemos um site com React ele não fica tão bem rankeado no Google por conta da maneira que o React trabalha, e o Next ajuda nisso.

O que acontece é que:

    Usuário -> <- Front (React) -> <- API

O usuário pede uma requisição para o nosso site e o nosso site retorna uma página em branco ou uma página de login, pois nosso front end em React está se concetando com a Api, aguardando os dados para que renderize esses dados na página.

Quando o usuário pesquisa alguma coisa no Google ou no Bing, eles vão olhar no nosso site e ver qual o conteúdo que tem lá para poder retornar ao usuário, mas como nosso site precisa de um tempo para se conectar com a API, os buscadores só irão ver tela em branco ou tela de loading, logo eles vão entender que não existe conteúdo ali por isso os sites feitos em React não conseguem se rankear bem.

Esse é o principal problema que temos no React e esse é um dos principais motivos que o Next foi criado, para resolver esse problema.

O Next tras duas soluções diferentes para resolver o mesmo problema, SSR e SSG.

Esses conceitos já existiam na programação, o que o Next fez foi trazer esse conceito para o React.

### SSR (Server Side Rendering - Renderizção no lado do servidor).

Lembrando que o React é Client Side.

Com o SSR a nossa aplicação vai rodar em cima de um servidor que no caso é um servidor Node. Desse modo, quando o usuário for fazer uma requisição ele não vai mais fazer para nosso Front e sim para o servidor. O server vai repassar essa requisição para o nosso Front e ai sim o nosso Front vai devolver o resultado para o usuário.

E agora quem vai fazer a requisição na Api é o server Node e o serve node vai repassar essa informação para o Front, ou seja, o Front só vai entrar na jogada quando ele já tiver os dados da API.

### SSG (Static Site Generating)

Essa é a segunda solução para o mesmo problema.

Aqui ele faz build das páginas de maneira estática.

    Buil -> Páginas -> Arquivos estáticos

O next ele vai pegar nossas páginas, vai fazer as requisições que precisam e vai buildar essas páginas de forma estática.

Exemplo, temos uma página de um tenis em um ecommerce por exemplo e já fizemos o build tudo certo, o site já está funcionando, mas por algum motivo tivemos que mudar a descrição do tenis ou alguma foto.

Quando fizermos essa alteração a página não vai se alterar, pois a build já fez aquela página estática.

A única forma de mudarmos isso é buildar novamente, então esse processo de SSg só é recomendável em páginas que não se alteram com tanta fraquência, por exemplo a página About(sobre).

Exemplo quando utilizamos SSG: Temos um ecommerce com 10 produtos e queremos fazer as página estática e para isso digitamos:

    export async function getStaticProps() {

        const {data} = await api.get('products/1'); //Utilizando axios para api

        return {
            props: {
                product: data,
            },
        }
    }

    export async function getStaticPaths() {

        const {data} = await api.get('products/1'); //Utilizando axios para api

        return {
            paths: data.map(product => ({
                params: { id: produc.id },
            })),
            fallback: false, // true, false , blocking
        }
    }

Dessa forma tudo que voltar dessa requisição de products ele vai gerar as páginas estáticas.

O getStaticPaths serve para isso, para dizer quais páginas eu quero que ele gere na hora do build.

Fallback é um tipo de captura, Qunaod tudo der errado o que eu faço ?

Vamos supor que dentro desses produtos gerados o usuário tentou aceesar um que não era tinha arquivo estático.

Fallback no false, não existe nada que posso fazer o usuário vai para a página 404, vai dar erro.

Fallback no blocking, ele vai deixar o usuário esperando, enquanto ele espera ele vai fazer a requisição de novo dos produtose vai gerar a build de novo para o usuário, é um build em runtime.

Fallback no true, ele basicamente, nó vamos ter que criar um página de fallback que vai ser mostrado enquanto o código está buildando a página é basicamente um block, mas o block vai deixar a página branca.

Um dos porblemas que nós temos com o SSG é justamente essa falta de dinamicidade, se nós mudarmos algo na API ela só fazer ser renderizada no próximo build.

### Revalidate ISR

    export async function getStaticProps() {

        const {data} = await api.get('products/1'); //Utilizando axios para api

        return {
            props: {
                product: data,
            },
            // ISR - Incremental Site Regeneration
            revalidate: 10 //segundos
        }
    }

O revalidate vai basicamente buildar nossa aplicação de tempos em tempos, então toda vez que nosso api mudar, nós não precisamos ir no next e buildar novamente esse revalidate vai fazer isso de forma automática. Lembrando que o tempo é em segundos.

Essa funcionalidade só funciona na Vercel.

Assistir aula 66.
