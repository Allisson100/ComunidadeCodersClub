import { memo } from "react"

function Card () {
    return (
        <div>
            <h1>Teste02</h1>
            <h2>Salve</h2>
            <h3>Será que vou ser renderizado novamente ???</h3>
        </div>
    )
}

export default memo(Card)