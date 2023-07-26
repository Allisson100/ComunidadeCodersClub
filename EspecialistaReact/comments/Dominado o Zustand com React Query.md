# Dominado o Zustand com React Query

Na nossa aplicação vai existir 3 tipos de estado, o estado Local, o estado Global, o estado do Servidor.

Temos que evitar o prop drilling.

Usando como exemplo um player de video onde temos os componetes totalmente separados, por exemplo barra de progresso e afins, nós precisamos saber qual é o tempo de video e para compartilhar essa informação é ideal utizar contexto, pois queremos extender as variaveis locais para que todos os componentes que necessitam do tempo de video utilizem ela. E nesse caso não pecisamos criar variáveis globais e sim apenas um variável local compartilhada, nesse caso o Contexto serve perfeitamente.

Para casos de variáveis globais é mais recomendável por exemplo em preferencias de usuário (user preferences), se o usuário escolheu tal tema dark ou light, plnos que o usuário tem acesso, etc.

A context API pura tem problemas de renderizações. As outras bibliotecas como o Zustand utilizam a context API por debaixo ds panos.

Se só usarmos a idade do usuário e por algum motivo, apenas o nome do usuário mudar, a Context API vai renderizar todos os componentes, esse seria o problema, causando um perda de eficiência na aplicação.

Porém isso na verdade foi uma forma que a Context API resolveu trabalhar, pois com isso outras ferramentas como o Zustand pode utilizar ela e fazer algumas otimizações.

Por isso que para variáveis Globais o Context API não é tão recomendável, é melhor utilizá-la no caso do diplay, onde teremos micros componentes compartilhando determinada variável.

### Servidor

Basicamente antigamente a gente utilizava a store do contexto para armazenar dados da Api e não necessariamente controlar um estado de algum dado que vinha da Api. Agora as coisas deram uma separada onde utilizamos uma ferramenta para controlar o estado do dados e outras para controlar o estado da api basicamente que é o estado de servidor.

Temos ferramentas como:

- SWR
- React query

Eles utlizam do cache para adicionar esse controle da camada de API.

### Desenvolvendo porjeto

Primeiro instalamos a biblioteca react-query

    yarn add react-query @types/react-query

Depois criamos uma pasta service e dentro dela um arquivo chamado queryClient.ts e nele digitamos:

    import { QueryClient } from 'react-query'

    const queryClient = new QueryClient()

    export default queryClient

Também criamos um arquivo Provider.tsx dentro da pasta src e digitamos:

    import { QueryClientProvider } from 'react-query'
    import queryClient from './services/queryClient'

    type Props = {
        children: React.ReactNode
    }

    export default function Provider({ children }: Props) {
        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    }

Vamos agora criar dentro da pasta services o arquivo api.ts e vamos utilizar o axios. Vamos intalá-lo primeiro:

    yarn add axios @types/axios

E agora no arquivo api.ts:

    import axios from 'axios'

    export default axios.create({
        baseURL: 'https://api.jikan.moe/v3'
    })

Possível dúvida: Se eu vou utilizar react query porque estou utilizando axio?

Um não substitui o outro, o axios ele vai ser a nossa ferramenta o nosso client de requisição e o react query vai ser o nosso client de cache, então ele vai adicionar um cache em cima da camada de requisição, mas a gente ainda precisa de algo para fazer a requisição, pois react query só vai adicionar o cache nessa camada, poderiamos utilizar o fetch sem problemas , mas o mais comum é o axios.

Criamos também um arquivo de tipos types.ts, mas o idel seria criar uma pasta chamada useFetchTopMangas e dentro dela criar o hook dentro do index.ts e criar os tipos daquele hook no type.ts.

Utilizamos um site chamado json2ts para pegar os tipo da api com mais facildiade.

Arquivo useFetchTopMangas.ts :

    import { useQuery } from 'react-query'
    import axiosInstance from '../api'
    import { TopMangaApiResponse } from './type'

    async function getTopMangas() {
        const { data } = await axiosInstance.get<TopMangaApiResponse>('top/manga')

        return data
    }

    export default function useFetchTopMangas() {
        return useQuery('topMangas', getTopMangas)
    }

Arquivo main.tsx:

    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.tsx'
    import './index.css'
    import Provider from './Provider.tsx'

    ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider>
        <App />
        </Provider>
    </React.StrictMode>,
    )

### Volatando para a ula

O React Query funciona da seguinte maneira. Hook que criamos para requisição:

    import { useQuery } from 'react-query'
    import axiosInstance from '../api'
    import { TopMangaApiResponse } from './type'

    async function getTopMangas() {
        const { data } = await axiosInstance.get<TopMangaApiResponse>('top/manga')

        return data
    }

    export default function useFetchTopMangas() {
        return useQuery('topMangas', getTopMangas)
    }

Nós utilizamos o axios para fazer a requisição da api, mas estamos exportando o hook useQuery para, esse useQuery vai basicamente armazenar os dados da api para a gente no cache e com isso o hook é inteligente o suficiente para: Vamos fazer uma requisição no código e ele vai na API e armazena em cache e depois disso qualuqer lugar do código que eu for usar a mesma API ele vai pegar do cache e não fazer outra requisição na API.

Para usar o conteúdo da api basta digitar:

    import useFetchTopMangas from './services/requests/useFetchTopMangas'

    const { data } = useFetchTopMangas()

    console.log(data);

Isso é maravilhoso para trabalhar com estado do servidor.

### Criando parte de favoritos com zustand

Criamos uma pasta dentro da pasta services e dentro dela um arquivo chamado useFavoriteMangas.ts e ele digitamos:

    import { create } from "zustand";
    import { persist } from 'zustand/middleware'

    type State = {
        favorites: number[]
    }


    export const useFavoriteMangas = create(
        persist(
        () => ({
            favorites: [],
        } as State),
        {
            name: 'useFavoriteMangas',
        }
        )
    )

Dessa forma em qualquer parte do arquivo podemos mudar o valores de favorites = [] com :

    useFavoriteMangas.setState()

Ou pegar seu valor com:

    useFavoriteMangas.getState()

No arquivo App.tsx:

    const favoriteManga = useCallback((id: number) => {
        const shouldFavorite = !favorites.includes(id)

        if(shouldFavorite) {
            useFavoriteMangas.setState({ favorites: [...favorites, id] })
        } else {
            useFavoriteMangas.setState({ favorites: favorites.filter((mangaId) => mangaId !== id) })
        }
    }, [favorites])

Craimos essa função que será chamada ao clicar em um botão, primeiro coma linha de código: const shouldFavorite = !favorites.includes(id), ela verifica se existe ou não o id já no array favorites.

Estamos usando uma pergunta deveriamosFavoritar (shouldFavorite), a função include nos retorn verdadeiro se o id já estiver no array, mas usamos o ! para inverter a resposta, pois nesse caso faz mais sentido.

Se o valor de shouldFavortite for true, nós devemos no if acrescentar esse número no array, se for falso vamos no else e utilizamos o .filter() para remover o id do array.

Arquivo App.tsx:

    import './App.css'
    import useFetchTopMangas from './services/requests/useFetchTopMangas'
    import { useFavoriteMangas } from './services/store/useFavoriteMangas';

    import { useCallback, useState } from 'react'


    function App() {

    const [showOnlyFavorites , setShowOnlyFavorites] = useState(false)

    const { data } = useFetchTopMangas()
    const { favorites } = useFavoriteMangas()

    const favoritedManga = useCallback((id: number) => {
        const shouldFavorite = !favorites.includes(id)

        if(shouldFavorite) {
            useFavoriteMangas.setState({ favorites: [...favorites, id] })
        } else {
            useFavoriteMangas.setState({ favorites: favorites.filter((mangaId) => mangaId !== id) })
        }
    }, [favorites])

    const toggleShowOnlyFavorites = useCallback(() => {

        setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites)
    }, [])

    // useFavoriteMangas.setState()
    // console.log(useFavoriteMangas.getState());

    return (
        <>
            <button onClick={() => toggleShowOnlyFavorites()}>Show Favorites</button>
            {
                data?.data.filter((manga) => !showOnlyFavorites || favorites.includes(manga.mal_id)).map((manga) => {
                    return (
                        <div key={`Manga${manga.mal_id}`} style={{ display: 'grid' }}>
                        <img src={manga.images.jpg.image_url} alt="" />
                        {manga.title}
                        <button onClick={() => favoritedManga(manga.mal_id)}>
                            {favorites.includes(manga.mal_id)? '*' : ''}
                            Favoritar
                        </button>
                        </div>
                    )
                })
            }
        </>
    )
    }

export default App

Lógica importante:

    data?.data.filter((manga) => !showOnlyFavorites || favorites.includes(manga.mal_id)).map((manga) => {
        return (
            <div key={`Manga${manga.mal_id}`} style={{ display: 'grid' }}>
            <img src={manga.images.jpg.image_url} alt="" />
            {manga.title}
            <button onClick={() => favoritedManga(manga.mal_id)}>
                {favorites.includes(manga.mal_id)? '*' : ''}
                Favoritar
            </button>
            </div>
        )
    })

Vamos lá, temos um botão que nos inforna se queremos mostrar aspenas os favoritos ou não.

A principal lógica está aqui:

     data?.data.filter((manga) => !showOnlyFavorites || favorites.includes(manga.mal_id)).map((manga).

Porque é o seguinte:

Eu tenho o array data com os iten da api, Se ele ler favorites.includes(manga.mal_id)) está parte, ele só irá fazer o map nos itens que retornam true no include caso o !showOnlyFavorites for falso, pois é do javascript recorrer ao seguinte, se eu tenho duas condições e eu utilizo o || (or) não tem porque eu verifivar a segunda condição se em todos os casos, caso a primeira condição for true então o resultado final sempre será true. É por isso que nó definimos o valor inicial do showOnlyFavorites como false e com isso utilizamos ! para inverter na condição para true, então por padrão ele vai ignorar a condição favorites.includes(manga.mal_id) e com isso vai fazer o map em todos os itens do array que etiver retornarndo da api.

Mas quando a gente clica no botão do showOnlyFavorites, ele vai mudar pra true essa variável e a condição vai mudar ele para false e com isso o javascript vai ter que ler a segunda condição para saber se o resultado final será true ou false, por isso ele le favorites.includes(manga.mal_id)).

### Melhorando o código

Dentro do arquivo useFavoriteManga.ts, onde utilizamos o Zustand, acrescentamos a função para sabermos se o manga recisa ser favoritado ou não:

    import { create } from "zustand";
    import { persist } from 'zustand/middleware'

    type State = {
        favorites: number[];
        favoritedManga: (id: number) => void;
    }


    export const useFavoriteMangas = create(
        persist<State>(
        (set , get) => ({
            favorites: [],
            favoritedManga: (id: number) => {

                const favorites: number[] = get().favorites
                const shouldFavorite = !favorites.includes(id)

                if(shouldFavorite) {
                    useFavoriteMangas.setState({ favorites: [...favorites, id] })
                } else {
                    useFavoriteMangas.setState({ favorites: favorites.filter((mangaId) => mangaId !== id) })
                }
            }
        } as State),
        {
            name: 'useFavoriteMangas',
        }
        )
    )

E no arquivo App.tsx:

    const { favorites , favoritedManga } = useFavoriteMangas()

Criamos essa constante que já buscava o favorites, mas agora busca também a função para saber se devemos favoritá-lo ou não.

Vale lembrar que esse caso foi feito poruqe temos apenas uma lista de favoritos, então por isso encaixa tão bem, mas poderia ser usado também no carrinhos que temos em E-commerces.

### Testes com zustand

Vamos criar uma pasta dentro da src com o nome **tests**, e basciamente temos que replicar a estrutura de nosso projeto dentro dessa pasta. Então dentro dessa pasta **test** vamos criar outras como services e dentro dela a store.

E vamos criar o rquivo App.test.tsx dentro da pasta **test**. E nele digitamos:

VOU ESTUDAR TESTES DEPOIS
