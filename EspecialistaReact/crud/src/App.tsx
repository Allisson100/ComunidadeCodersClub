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
