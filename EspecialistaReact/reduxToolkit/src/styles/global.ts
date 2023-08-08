import { createGlobalStyle } from "styled-components"

export default createGlobalStyle `
    #root {
        width: 100%;
        height: 100vh;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    * {
        margin: 0;
        box-sizing: border-box;
        outline: 0;
    }

    button {
        cursor: pointer;
    }
`