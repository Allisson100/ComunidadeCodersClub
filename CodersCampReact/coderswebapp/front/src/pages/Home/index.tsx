import { getUser } from "../../services/user";
import { useUSerData } from "../../stores/useUserData"
import { Title } from "./styles"

function Home () {

    const { name, age } = useUSerData();

    async function changeUSer () {

        const {data} = await getUser('lukemorales');
        

        useUSerData.setState({
            name: data.name,
            age: data.followers
        })
    }

    return (
        <>
            <Title>Home</Title>

            <h2>{name}</h2>
            <h3>{age}</h3>

            <button
                type="button"
                onClick={changeUSer}
            >
                Mudar Usuário
            </button>
        </>
        
    )
}

export default Home