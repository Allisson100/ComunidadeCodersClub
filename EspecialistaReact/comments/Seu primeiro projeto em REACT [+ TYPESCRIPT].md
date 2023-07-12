# SEU PRIMEIRO PROJETO EM REACT [+ TYPESCRIPT]

Vamos criar o projeto com Vite. Para isso digitamos no terminal:

    yarn create vite nome_do_projeto (no meu caso foi crud)

Depois escolha o framework, no meu caso foi o React e depois se quer com typescript ou não.

Depois é so entrar na pasta do projeto e dar um yarn para instalar as dependencias.

Exlicação sobre JSX.

Agora vamos começar a fazer o projeto do Todo List.

Vou utilizar o Styled Components já para começar a praticar, mas na aula ele usa css normal.

Resumo até o momento:

- Criamos o componentes Card
- Criamos o componente de input
- Vamos deixar mias dinamico agora

Achei legal o ponot de importar o tipo para o typescript.

Arquivo App.tsx:

    import GlobalStyles from './styles/global'

    import { AppContainer , AddTodo , AddTodoInput } from './appStyles'
    import Card from './components/Card'
    import { useState } from 'react'

    export type Todo = {
        id: number;
        title: string;
        completed: boolean;
    }

    function App() {

        const [todos , setTodos] = useState<Todo[]>([])

        return (
            <>
            <GlobalStyles/>
            <AppContainer>
            <AddTodo>
                <AddTodoInput type="text" placeholder='Fazer café' />
                <button>Adicionar</button>
            </AddTodo>

            {
                todos.map((todo) => (
                <Card key={todo.id} todo={todo}/>
                ))
            }
            </AppContainer>
            </>

        )
    }

    export default App

Como podemos ver utilizamos o type Todo para tipar a const todos, mas também importamos ele, pois vamos utilizá-lo como props no componente card e lá precisamos tipar de novo. Arquivo index.tsx do componente Card:

    import { Todo } from '../../App';
    import { CardContainer , CardButtons } from './styles'

    type CardProps = {
        todo: Todo;
    }

    export default function Card ({ todo }: CardProps) {
        return (
            <CardContainer>
                <h2>{todo.title}</h2>
                <CardButtons>
                    <button>Completar</button>
                    <button>Deletar</button>
                </CardButtons>
            </CardContainer>
        )
    }

Temos como código final.

Arquivo App.tsx:

    import GlobalStyles from './styles/global'

    import { AppContainer , AddTodo , AddTodoInput } from './appStyles'
    import Card from './components/Card'
    import { useEffect, useState } from 'react'

    export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    }

    function App() {

    const [todoInput , setTodoInput] = useState('')
    const [todos , setTodos] = useState<Todo[]>(() => {
        const storedTodos = localStorage.getItem('@coderslist:todos')

        if(storedTodos) {
        return JSON.parse(storedTodos)
        }

        return []
    })

    useEffect(() => {
        localStorage.setItem('@coderslist:todos', JSON.stringify(todos))
    }, [todos])

    function addTodo () {
        setTodos((previousTodos) => [...previousTodos, {
        id: Math.random(),
        title: todoInput,
        completed: false,
        }])

        setTodoInput('')
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTodoInput(e.target.value)
    }

    function completeTodo(id: number) {
        setTodos((previousTodos) => previousTodos.map(
        (todo) => todo.id !== id ? todo : { ...todo, completed:  !todo.completed}
        ))
    }

    function deleteTodo(id: number) {
        setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id))
    }

    return (
        <>
        <GlobalStyles/>
        <AppContainer>
        <AddTodo>
            <AddTodoInput
            type="text"
            placeholder='Fazer café'
            value={todoInput}
            onChange={handleInputChange}
            />

            <button onClick={addTodo}>Adicionar</button>
        </AddTodo>

        {
            todos.map((todo) => (
            <Card
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}/>
            ))
        }
        </AppContainer>
        </>

    )
    }

    export default App

Arquivo index.tsx:

    import { Todo } from '../../App';
    import { CardContainer , CardButtons } from './styles'

    interface CardProps {
        todo: Todo;
        completeTodo: (id: number) => void;
        deleteTodo: (id: number) => void;
    }

    export default function Card ({ todo , completeTodo , deleteTodo }: CardProps) {

        console.log(todo);


        function handleCompleteTodo() {
            completeTodo(todo.id)
        }

        function handleDeleteTodo () {
            deleteTodo(todo.id)
        }


        return (
            <CardContainer style={(todo.completed === false) ? {opacity: 1} : {opacity: 0.5}}>
                <h2>{todo.title}</h2>
                <CardButtons>
                    <button onClick={handleCompleteTodo}>
                        {(todo.completed === false) ? 'Completar' : 'Retomar'}
                    </button>
                    <button onClick={handleDeleteTodo}>Deletar</button>
                </CardButtons>
            </CardContainer>
        )
    }
