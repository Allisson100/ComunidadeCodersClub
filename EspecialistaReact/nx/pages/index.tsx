import { useState } from "react"
import Teste from "../components/Teste"
import Card from "../components/Card"

function Home () {

  const [teste , setTeste] = useState('Teste')

  function handleChangeName() {

    if(teste !== 'Allisson') {
      setTeste('Allisson')
    } else {
      setTeste('Teste')
    }
    
  }



  return (
    <>
      <Teste name={teste} />
      <button onClick={handleChangeName}>Trocar Nome</button>
      <Card />
    </>
    
  )
}

export default Home
