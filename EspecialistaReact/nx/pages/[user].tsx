import { GetStaticPaths, GetStaticProps } from "next"

export default function User ({ username }) {
    return (
        <div>
            user: {username}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async() => {
    return {
        paths: [
            {
                params: {
                    user:'CarlosLevir'
                }
            },
            {
                params: {
                    user:'filipedeschamps'
                }
            }
        ],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async({ params }) => {

    const {user} = params

    const resp = await fetch(`http://api.github.com/users/${user}`)
    const data = await resp.json()

    return {
        props: {
            username: data.bio
        }
    }
}