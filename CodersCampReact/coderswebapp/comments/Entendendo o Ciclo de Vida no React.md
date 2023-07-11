# Entendendo o Ciclo de Vida no React

O ciclo de vida é o ciclo de existência de um componente.

Todo os os componentes do React possuem alguns estados e esses estados compoem o ciclo de vida desses componentes.

O primeiro estado desse ciclo de vida é quando o componente ainda não foi criado na tela, quando o componente não existe ainda em tela, chamado Unmounted(Desmontado). Esse estado existe quando o componente ainda não está sendo renderizado na tela, seja porque ainda não deu tempo da aplicação carregar ele, ou porque ele depende de alguma renderização condicional, ou depende de algum variável ou alguma página ou alguma rota, ou seja, depende de algo para ser renderizado.

Depois que nosso componente é renderizado n tela ele passa para o próximo passo do ciclo de vida que é o Mounted(Montado). Esse estado é quando o nosso componente é mostrado em tela.

O proximo passa é o estado de Unmounted. O estado de Unmounted ele começa e finaliza o ciclo de vida de um componente. 

Existe dois estados do ciclo de vida que ocorrem quando o componente está montado, ou seja, no estado de Mounted. O primeiro estado que está no estado Mounted são os estados de atualizações (Updates), quando nosso componente está montado ele pode sofrer algumas atualizações. Quando ocorrem essas atualizações, sejam nas props ou no estado, esses componentes renderizam novamente. 

No estado de Mounted existe um segundo estado que é o estado de Error. No estado de error nó não podemos utilizar os hooks do React, tem uma forma de se trabalhar com os erros, mas sem utilizar os hooks.

A idéia de tudo isso no React é que os Hooks vieram para o React para interceptar as ações do ciclo de vida, essa é a idéia principal do Hooks no React.

Por exemplo, eu posso utilizar um hook, onde ele vai executar uma ação quando o ciclo de vida do componente mudar do estado Unmounted para o estado Mounted.



