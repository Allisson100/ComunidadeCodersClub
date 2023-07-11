import useConsole from '../../hooks/useConsole'
import { Container , Logo } from './styles'


function Dashboard () { 

    useConsole('Teste')

    return (
        <Container>
            <Logo src='https://cdn-icons-png.flaticon.com/512/552/552250.png' alt="CL Logo" />
        </Container>
    )
}

export default Dashboard