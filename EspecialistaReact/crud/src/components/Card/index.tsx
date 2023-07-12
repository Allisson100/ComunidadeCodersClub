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