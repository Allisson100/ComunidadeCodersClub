# Gerenciamento de estado e arquitetura FLUX

Gerenciamento de estado é bascicamente um forma da gente controlar os estados da nossa aplicação.

Em nossa palicação temos o estado global e o estado local

- Estado Local são os estados de cada componente, exemplo State e Props. Aqui também além do prop drilling, nó não temos uma única fonte de verdade, ou seja, o componente C2 tem uma taxa de 5% i precisamos passsar isso para C1 e só depois para C3, nada impede de eu egrar esses dados em C2 e lterar a taxa para 6% em C1 por exemplo, não temos uma padronização.

- Estado Global temos a Context API.
- Temos a feraamaneta também o MobX.
- Temos o Recoil.

### Redux

E temos o Redux que é bastante utilizado. Ele é a alternativa mais utilizada e a arquitetura mais utilizada.

Ele implemanta essa arquitetura escalável que é a arquitetura Fluxy.

Redux e Context API resolvem problemas iguais, mas de forma diferentes e para contextos diferentes.

Mas o Redux ele vai ser utilizado em projetos maiores, ele vai padronizar o fluxo de operações.

A Context API vai ser utilizado em projetos mais simples.

O ideal seria utilizar Redux para estados que vão ser utilizados em várias partes da aplicação e a Context API em partes específicas do projeto, onde os dados serão utilizados somente em alguns componentes e não na maioria.

### Arquitetura Flux

Como funciona?

Basicamente nessa arquitetura vamos ter quatro papéis:

- View (Componente), exemplo: (Adicionar item no carrinho)
  É o nosso ponto de partida.

- Actions, exemplo: (Type: @cart/ADD_ITEM ) / (Payload: { item })
  As actions são basicamente funções que estão conectadas a um tipo, então cada action tem um tipo e ela também vai receber a informação que estamos passando para ela e vai repassar essa informkação para o Dispatcher.

- Dispatcher, é o ato da Action salvar essa informação na Store.

- Store.
  Uma vez os dados na store eles podem ser acessados em todas as views(componentes).

Então temos a view que é nosso componente, ele vai disparar uma Action que está ligado a um type, essa Action vai fazer um Dispatch e vai salvar a informação na store. Com os dados na Store podemos acessá-los em qualquer componente com uma single source of truth (Única fonte de verdade).

Mas temos um problema nesse fluxo, todos os itens do nosso fluxo são funções puras e funções puras não podem ter side effects, em nenum desses pontos do fluxo eu não posso fazer uma chamada a API.

Por exemplo se quisermos utilizar uma API para fazer o calculo do frete como fariamos isso? Umas das alternativas que temos é fazer a requisição no componente antes de enviarmos os dados para a Store.

Mas com isso vamos ter o problema de responsabilidade única, pois não é reponsabilidade do meu componente(view) fazer isso. Exemplo, não é responsabildiade do meu componente ir até a API taxar o produto e salvar na Store.

E essa questão de responsabilidade em contextos mais complexos podem ficar um pouco mais difícil de debugar e saber exatamante onde está acontecendo as requisições.

Então como podemos trabalhar essa parte de assincronismo dentro da arquitetura flux?

Vamos ter dois fluxos:

- Fluxo Thunk
- Fluxo Saga

Ambos são Middlewares.

### Fluxo THUNK

Essa é a opção mais simples, mas ela acaba não sendo tão recomendada, pois parece que não temos mais manutenção nessa biblioteca.

Ela funciona da seguinte forma:

- Vamos ter nosso componente(view), exemplo: (fazer login)

- O próximo passo é o THUNK, de vez o componente chamar uma Action ele vai chamar um THUNK.
  Essse Thunk vai ficar responsável por fazer o disptach e chamar as actions que a gente precisa.

- Depois que o thunk fez todas requisições e afins, vamos ter as Actions

- Depois vamos ter um novo conceito que é o Reducer.
  O reducer basicamente vai trabalhar como um espécie de filtro só para dizer como os meus dados devem ser salvos, tudo o que o Reducer retornar será salvo na Store.

- Store.

Lembrando que o Dispatch que nós tinhamos antes vai ser chamado pelo nosso thunk.

E também no reducer vamos sempre utilizar switch case e não if e else.

### Fluxo SAGA

O Saga não vai implicar no fluxo da operação, então temos:

- Componente(view), exemplo: (fazer login)
- Action
- Reducer
- Store

Porém na parte de Action ela se ramifica, ou seja, vamos ter um fluxo paralelo de dados.

- E do saga chamamos outras actions

É meio difícil de entender, mas basicamente vai ocorrer dois fluxos paralelos a partir da Action, entõ vamos ter o fluxo original com:

    Componente - Action - Reducer - Store - Componente
                |
                SAGA(chamada a API)  - Action - Reducer - Store - Componente
