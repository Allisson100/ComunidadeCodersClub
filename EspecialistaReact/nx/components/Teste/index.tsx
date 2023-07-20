interface Props {
    name: string;
}


export default function Teste ({ name }: Props) {
    return (
        <h1>{name}</h1>
    )
}