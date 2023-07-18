import { GetStaticProps } from "next"

export default function Usuario ({ username }) {
    return (
        <div>
            user: {username}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async() => {

    const resp = await fetch('http://api.github.com/users/CarlosLevir')
    const data = await resp.json()

    return {
        props: {
            username: data.name
        }
    }
}