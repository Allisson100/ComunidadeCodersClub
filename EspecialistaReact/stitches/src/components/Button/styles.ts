import { codersStyled } from "../../styles/stitches.config";

const ok = false

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

    defaultVariants: {
        variant: 'primary'
    }
})