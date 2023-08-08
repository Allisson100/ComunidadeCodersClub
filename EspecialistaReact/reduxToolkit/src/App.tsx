import Main from './pages/Main'
import { store } from './store'
import GlobalStyles from './styles/global'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Main />
    </Provider>
  )
}

export default App
