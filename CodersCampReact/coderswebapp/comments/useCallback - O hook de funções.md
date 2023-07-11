# useCallback | O hook de funções

O useMemo não é recomendado para utilizar para funções.

Para funções utilizamos um Hook específico que se chama useCallback().

Se usarmos o useMemo() nós vamos obter o retorno do return normal.

Já o useCallback() ele nos retorna a função em si, exemplo:

    const func = useCallback(() => {
        
    },[])

Isso seria igual a:

    const func = () => {
        
    }

Porém não teriamos a propriedade de memoização que o Hook nos tras.

Nunca se esqueça de manter um array de dependências de um Hook atualizado.


    
