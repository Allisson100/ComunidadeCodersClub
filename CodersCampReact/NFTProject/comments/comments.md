# Criação e setup do projeto

Fizemos uma estruturação no projeto, apagamos o que não seria utilizado e acrescentmos uma formatação simples no arquivo index.css:

    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }

    html, body, #root {
    width: 100%;
    }

    button, input {
        border: 0;
    }

Criamos a pasta components e pages também dentro da página src.

Criamos uma estrutura de pastas:

    Src:(folder)
        components:(folder)
        pages:(folder)
            Home:(folder)
                index.js(file)
            
Criamos a página Home e podemos cria-las da seguinte forma:

    export function Home() {
        return (
            <div>
                Página Home
            </div>
        )
    }

Ou:

    const Home = () => {
        return (
            <div>
                Página TAm
            </div>
        )
    }

    export default Home


# Criando o componente de filtro

Criamos os estilos dos botôes, não estão 100% ainda, mas vamos melhorar depois.

    .button:hover,
    .smallButton:hover {
        transform: scale(1.05);
    }

    .button:active,
    .smallButton:active {
        transform: scale(0.95);
    }

Estilo para efeito de clicar no botão.

# Renderizando a listagem de NFTs

Criamos um arquivo mock.js e exportamos ele. Ele basicamente é uma API fake.

E criamos o componente Card com as estilizações dele.

# Criando o Header da aplicação

Fizemos o Component Header e criamos suas estilizações

# Aprendendo a trabalhar com ícones no React

Quando trabalhamos com icones, podemos instalar bibliotecas de icones de terceiros e utilizá-los.

Podemos utilizar os icones como imagens também.

Vamos transformar o svg do icone em components no React.

Para transformar um SVG em JSX temos que ter a imagem do ícone em SVG.

Depois fazemos uma busca no google 'SVG to JSX'.

Colocms nosso icone svg nesse site e ele já converte em um componente React para nós.

Site: (https://svg2jsx.com/)

# Adicionando ícones ao projeto

Adicionamos os icones, mas falta a estilização ainda.

# Aprendendo a trabalhar com Pixel Perfect

Pixel Perfect é uma prática para deixar o layout perfeito em relação ao Design (no nosso caso Figma).

Vamos adiconar uma extensão no chrome que chama PerfectPixel by WellDoneCode (pixel perfect).

Basicamente você consegue sobrepor uma imagem sobre a outra e ver os detalhes.

# Completando os estilos da aplicação

Adicionamos um estilo global para todos os SVG:

    svg {
    width: 1.25rem;
    height: 1.25rem;
    }

Depois apenas ajustamos alguns CSS e acrscentamos algumas div.

# Utilizando o hook de estado

Deixamos o input de busca funcional.

Primeiro no input chamamos uma função e atribuimos um estado a ele:

    <input  
        type='text'
        placeholder='Search by collection, user or NFT...'
        className={styles.input}
        onChange={handleInputChange}
        value={inputValue}
    />

    const [inputValue, setInputValue] = useState('')

    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    const filteredNFTs = nfts.filter((nft) => nft.name.toLowerCase().includes(inputValue.toLowerCase()))

Basicamente chamamos a função handleInputChange quando acontece o evento onChange no botão, essa função atualiza nossa variável inputValue e com isso nós conseguimos aplicar um filtro:

    const filteredNFTs = nfts.filter((nft) => nft.name.toLowerCase().includes(inputValue.toLowerCase()))

A const filteredNFTs é um array e nele contém todos os itens que possuem o mesmo nome do input.

Temos que usar a função do JavaScript includes junto com a função toLowerCase, pois ela é case sensitive, Arroz é diferente de arroz.

Futuramente vou melhorar o input para ele filtrar pelos nomes e pelo author também.

# Criando o botão de Load More

Apenas aplicamos estilos no botão show more.

# Ajustando a responsividade da aplicação

Fizemos apenas alguns ajustes de responsividade.






















