# ARQUITETURA DE PROJETOS REACT

Uma boa arquitetura é a chave pra escalabilidade e manutenibilidade de um projeto. Um projeto bem estruturado vai evitar muitas dores de cabeça e refatoração conforme novas funcionalidades são adicionadas ao escopo de desenvolvimento.

### Estrutura mais comum de projetos React

src
|\_assets
|\_components
|\_constants
|\_hooks
|\_pages
|\_services
|\_store
|\_utils
|\_App.tsx
|\_index.ts

### Onion architecture ou clean architecture

### Vertical slices

Uma arquitetura recomendável para front end.

### Estrutra ideal

Depois de uma discussão consideramos a seguintea arquitetura como o mais próximo do ideal:

src
|\_app //contains app-wide setup and layout that depends on all the others folders, ...
|\_assets
|\_components //global components
|\_features | modules | domains // aplication features
|\_mocks //moskc and handlers with msw
|\_pages
|\_services
|\_shared
|\_index.ts // entry point file that renders the React component tree

### Pasta App/

    app
        |\_components
            |\_Layouts
            |\_Providers
        |\_config?
        |\_routes
        |\_styles
        |\_store?
            |\_rootReducer.ts
            |\_index.ts
        |\_App.tsx
        |\_index.ts

O ponto importante aqui é que apenas o arquivo index.ts expõe somente o App.tsx para ser renderizdo em src/index.ts, ou seja, nenhum outro arquivo do projeto importa da pasta /app.

### Pasta components/

    components
        |_Header
        |_Button
        |_Dropdown

### Pasta features/

Em um mundo ideal cada feature deveria ser independente e não ter relações com outras features, mas as vezes isso não será possivel e aí terá que ter uma conversa entre times.

Sempre tentar fazer com que uma feature dependa o menos possível da outra.

    features | modules | doamins
        |_auth
        |_dashboard
            |_components
            |_constants
            |_contexts?
            |_hooks?
            |_requests
            |_queries?
            |_types
            |_utils
            |_index.ts
        |_cart
            |_components
                |_Cart
                |_CartProduct
        |_product
            |_components
                |_Product
                |_ProductList

### Pasta pages/

Aqui ficam as páginas da plicação.

    pages
        |_DashboardPage
        |_ProductPage
        |_ProductListPage

### Pasta services/

Instâncias de bibliotecas que serão reutilizadas em todo projeto.

    |_services
        |_api
        |_query-client
        |_sentry
        |_etc ...

### Pasta shared/

Códigos compartilhados entre toda a aplicação, sempre organizado por domínios. Geralmente funções utilitárias e hooks.

    shared
        |_currency
            |_format-currency
        |_date
            |_format-date
            |_format-hour
        |_dom
            |_useWindowSize
            |_useClickOutside

