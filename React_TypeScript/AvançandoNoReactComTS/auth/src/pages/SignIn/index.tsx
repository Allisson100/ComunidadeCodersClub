import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import { Container , Logo , Input , Button } from './styles'


function SignIn () {

    const {signed , loading , signIn} = useContext(AuthContext)

    function handleSingIn() {
        signIn()
    }
    

    return (
        <Container>
            <Logo src='https://cdn-icons-png.flaticon.com/512/552/552250.png' alt="CL Logo" />
            <Input type="text" defaultValue="test@email.com"/>
            <Input type="password" defaultValue="12345678"/>
            <Button onClick={() => handleSingIn()}>
                {loading ? 'Carregando' : 'Entrar'}
            </Button>
        </Container>
    )
}

export default SignIn