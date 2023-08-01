import { useSelector , useDispatch } from 'react-redux'
import { StoreState } from '../../store/createStore.ts'
import { signInRequest } from '../../store/modules/auth/actions.ts';

function Teste () {

    const { loadingSignInRequest , error } = useSelector((state: StoreState) => state.auth)
    const dispatch = useDispatch()

    console.log('LOADING: ', loadingSignInRequest);
    console.log('Error: ', error);
    
    return (
        <div>
            <h1>TESTE</h1>
            <button onClick={() => dispatch(signInRequest({ email: 'teste@gmail.com' , password: '123456' }))}>testeBT</button>
        </div>
    )
}

export default Teste