# STITCHES JS no React

Stitches também é uma ferramenta de estilização, para instalá-lo digitamos no terminal:

    yarn add @stitches/react

Agora criamos uma pasta chamada styles e dentro dela um arquivo stitches.config.ts e nele digitamos:

EXTENSÃO CSS PIPERS (INSTALAR DEPOIS) ELE PEGA AS CORES PRESENTES EM UM PÁGINA DA WEB.

Arquivo stitches.config.ts :

    import { createStitches } from "@stitches/react"

    const convertToRem = (value: number) => `${value / 16}rem`

    const space = {
        4: convertToRem(4),
        8: convertToRem(8),
        12: convertToRem(12),
        16: convertToRem(16),
        20: convertToRem(20),
        24: convertToRem(24),
        28: convertToRem(28),
        32: convertToRem(32),
        36: convertToRem(36),
        40: convertToRem(40),
    }

    export const { styled: codersStyled } = createStitches({
        prefix: 'codersclub',
        theme: {
            colors: {
                black: '#000000',
                white: '#ffffff',

                gray900: '#090909',
                gray800: '#181818',
                gray700: '#333333',

                codersRed: '#ff2748',

                background: '#090909',
                shape: '#181818',

                'text-default': '#ffffff',
                'text-highlight': '#ff2748',

                'button-primary-bg': '#ff2748',
                'button-primary-text': '#ffffff',
                'button-secundary-bg': 'transparent',
                'button-secundary-text': '#ffffff',
            },
            radii: {
                default: '0px',
                pill: '999999px'
            },
            space,
            sizes: space,
        },
    })

Basicamente nesse arquivo de configuração do stitches conseguimos criar algumas variáveis padrões de estilo para utilizar em nosso projeto.

Adicionamos uma configuração no utils para no ajuda nos paddings.

    utils: {
        px: (value: ScaleValue<'space'>) => ({
            paddingLeft: value,
            paddingRight: value,
        }),
        py: (value: ScaleValue<'space'>) => ({
            paddingTop: value,
            paddingBottom: value,
        }),
    },

Lembrando que temos que exportar o ScaleValue da biblioteca stitches:

    import { createStitches , ScaleValue } from "@stitches/react"

Agora por exemplo criamos um styled component mas com diversas variáveis e conseguimos chamar elas normalmente.

Componente Button:

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

Aqui eu criei algumas condições só para testar.

Arquivo styles.ts do Componente Button:

    import { codersStyled } from "../../styles/stitches.config";

    export const ContainerButton = codersStyled('button', {
        appearance: 'none',
        border: 0,

        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        cursor: 'pointer',

        px: '$32',
        py: '$16',

        variants: {
            variant: {
                primary:{
                    background: '$button-primary-bg',
                    color: '$button-primary-text',
                },
                secundary: {
                    background: '$button-secundary-bg',
                    color: '$button-secundary-text',
                    border: '1px solid',
                    borderColor: '$coders-red',
                },
            },
            pill: {
                true: {
                    borderRadius: '$pill'
                }
            }
        },

        defaultVariants: {
            variant: 'primary'
        }
    })

E aqui tem o css padrão do botão e criamos algumas variáveis que podemos chamar no componente.

E o arquivo App.tsx ficou assim:

    import './App.css'
    import { Button } from './components/Button'

    const test = false

    function App() {
        return (
            <>
                <Button test={test}/>
            </>
        )
    }

    export default App

e caso eu queira criar condições na variável do Stitches eu posso fazer isso:

    variants: {
        variant: {
            primary:{
                background: '$button-primary-bg',
                color:`${ok ? '$button-primary-text' : 'green'}` ,
            },
            secundary: {
                background: '$button-secundary-bg',
                color: '$button-secundary-text',
                border: '1px solid',
                borderColor: '$coders-red',
            },
        },
        pill: {
            true: {
                borderRadius: '$pill'
            }
        }
    },
