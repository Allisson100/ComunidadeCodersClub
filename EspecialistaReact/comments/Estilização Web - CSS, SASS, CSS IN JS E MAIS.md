# Estilização Web - CSS, SASS, CSS IN JS E MAIS

nesting - estilos encadeados

Forma padrão do CSS, pontos negativos:

- Limitação (Nesting, Variáveis)
- Organização
- Repetição de Código
- Colisão de estilos

### Pré processadores:

Funcionam apenas em tempo de desenvolvimento

- SASS
- LESS
- STYLUS

Pricipal vantagem é o Encadeamento.

Para criar um arquivo SASS é bem simples é só criar um arquivo com o nome styles.scss.

Se a gente quiser escrever o mesmo código CSS no arquivo SASS a gente consegue. Exemplo:

    #dashboard .container .test {
        color: white;
    }

    #dashboard .container .test .text {
        color: white;
    }

    #dashboard .container .test .text .icon {
        color: white;
    }

Isso é um CSS comum.

    #dashboard .container .test {
        color: white;

        &.text {
            color: white;
        }

        &.icon {
            color: white;
        }
    }

Agora temos o mesmo código mas com o SASS, temos como principal vantagem o encadeamento. Eu só não se precisa daquele & ainda ou não.

Estudar sobre o BEM pattern.

### Pós processadores

- PostCSS

Pré processsadores -> Ele vai pegar os seu código e depois vai transpilar para o CSS padrão e nesse hora podemos adicionar o Pós processador e ele vai melhorar o CSS.

O Pós processador vai basicamente deixar seu site mais enxuto, vai remover os comentários, esse tipo de coisa.

Pesquisar mais no YouTube depois.

### CSS IN JS

Mostrou um pouco do Styled Components.

## Links para estudou:

GetBem -> https://getbem.com/

SASS/SCSS -> https://sass-lang.com/

LESS -> https://lesscss.org/

Stylus -> https://stylus-lang.com/

PostCSS -> https://postcss.org/

Styled Components -> https://styled-components.com/docs/basics

Emotion -> https://emotion.sh/docs/introduction
