# Regras e funcionamento dos hooks

Uma breve explicação do porque não podemos utilizar os Hooks em condicionais.

O React ele trabalha de forma sequencial, então quando um componente é criado o React ele pega esses hookes de maneira sequencial, tipo, tal  hook é o primeiro, tal hook é o segundo.

Quando criamos uma condição para tal hook existir, pode ocorrer que o segundo hook não exista mais (quando a página recarregar de novo) por conta de algum condição e ai o terceiro hook teria que passar a ser o segundo e isso quebraria a lógica do React.