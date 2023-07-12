import styled from "styled-components"

export const AppContainer = styled.div `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 10rem 0 10rem;
    gap: 1rem;
`

export const AddTodo = styled.div `
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
    gap: .5rem;
`

export const AddTodoInput = styled.input `
    width: 100%;
    border-radius: 8px;
    padding-left: 1rem;
`

export const ContainerTodo = styled.div `
    display: flex;
    flex-direction: column;
    gap: 1rem;
`