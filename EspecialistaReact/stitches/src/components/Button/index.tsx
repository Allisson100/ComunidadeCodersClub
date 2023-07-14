import { ContainerButton } from "./styles"

interface Props {
    test: boolean;
}

export const Button = ({ test }: Props) => {
    return (
        <>
            {test && <ContainerButton variant={'primary'}>Verdadeiro</ContainerButton>}
            {(test === false) && <ContainerButton variant={'secundary'} pill>Falso</ContainerButton>}
        </>      
    )
}
