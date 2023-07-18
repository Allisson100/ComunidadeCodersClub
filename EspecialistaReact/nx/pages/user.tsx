import { GetServerSideProps } from "next"

export default function User ({ username }) {
    return (
        <div>
            user: {username}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async() => {

    const resp = await fetch('http://api.github.com/users/CarlosLevir')
    const data = await resp.json()

    return {
        props: {
            username: data.name
        }
    }
}