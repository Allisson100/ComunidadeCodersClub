import { Provider } from 'react-redux'
import styled from './global.module.css'
import { store } from './store'
import Teste from './components/Teste'

function App() {

  return (
    <Provider store={store}>
      <div className={styled.container}>
        <Teste />
        <h1>LOGO</h1>
        <input type="text"  placeholder='Email'/>
        <input type="password" placeholder='senha'/>
        <button>Entrar</button>
      </div>
    </Provider>
  )
}

export default App
