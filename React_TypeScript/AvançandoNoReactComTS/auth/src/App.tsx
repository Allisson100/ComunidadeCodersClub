import GlobalStyles from './styles/global'
import theme from './styles/theme'
import { ThemeProvider } from 'styled-components';
import AppRoutes from './routes'
import {  BrowserRouter as Router } from 'react-router-dom';
import ContextProvider from './contexts';

function App() {

  const newTheme = theme.default

  return (
    <ThemeProvider theme={newTheme}>
      <ContextProvider>
        <Router>
          <GlobalStyles />
          <AppRoutes />
        </Router>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
