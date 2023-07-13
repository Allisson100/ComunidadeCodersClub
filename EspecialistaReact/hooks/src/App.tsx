import { useReducer , useRef } from 'react'
import './App.css'
import Input from './components/Input'

function App() {

  const ref = useRef<HTMLInputElement>(null)
  
  return (
    <>
      <Input ref={ref}/>
    </>
  )
}

export default App
