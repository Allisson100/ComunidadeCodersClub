import styled from "styled-components";

export const CardContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    background-color: #414141;
    padding: 1rem 2rem;
    color: #fff;
    width: 100%;
    flex-wrap: wrap;
`

// opacity: ${(props) => (props.completed ? 0.5 : 1)};

export const CardButtons = styled.div<{ enabled: boolean }> `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    /* opacity: ${({ enabled }) => (enabled && 1)}; */ //Assim funciona
`

