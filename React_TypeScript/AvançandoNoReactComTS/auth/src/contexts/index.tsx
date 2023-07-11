import { AuthProvider } from "./auth";

interface Props {
    children?: React.ReactNode;
}


export default function ContextProvider({ children }: Props) {
    return(
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}