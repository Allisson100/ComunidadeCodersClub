# Performance no React

A interface no React é declarativa, ou seja, ela vai resposnder de acordo com os valores de nossas variáveis e afins.

E no Javascript temos que mudar os elementos de forma implicita .

- Toda vez que uma prop se atualiza o Componente se renderiza também.
- E também se atualiza quando o estado se atualiza.

- Utilizamos o useCallback e UseMemo para melhorar nossa performance.

- Lembrando que useMemo é para variáveis e useCallback para funções.

- O useCallback é bom quando iremos fazer uma requisição na API com fetch ou axios, por exemplo.

- Utilizar a função memo para exportar os componentes, é interesssante utilizar ele quando o componente não tem muitas renderizações.

Podemos utilizar o lazy para renderizar componentes de forma condicional. Exemplo:

    const Button = lazy (() => import('./components/Button'))

    function App() {
        const [buttonText , setButtonText] = useState('teste)

        return (

            <div>

                {
                    true && (
                        <Button>{buttonText}</Button>
                    )
                }

                <button onClick={() => setButtonText('ATUALIZADO')}>atualiza</button>
            </div>

        )
    }

# Bibliotecas

- react window:

Ela renderizar apenas conteúdo que cabe na tela, assim evita renderizações desnecessárias.

- RecyclerListView (para ReactNative):

Ela vai reutilizar views que já tem para não precisar renderizar views trabalhando com listas.

# Ferramentas para ver performance do projeto

- Lighthouse, funciona no próprio navegador, mas é mais para o build final.
- React dev tools (já tenho)
- Biblioteca WDYR, mas ela é chata de configurar principalmente coom typescript.

Nos projetos finais sempre tentar trabalhar em cima dos bundles quando o código é transpilado.
