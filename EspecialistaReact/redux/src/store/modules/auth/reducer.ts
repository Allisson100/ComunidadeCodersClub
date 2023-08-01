import { AuthActions, AuthState } from "./types";

const initialState: AuthState = {
    loadingSignInRequest: false,
    isSignedIn: false,
    error: false,
}

export default function auth(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case '@auth/SIGN_IN_REQUEST':
            return {
                ...state,
                loadingSignInRequest: true,
            }
        case '@auth/SIGN_IN_SUCCESS':
            return {
                ...state,
                loadingSignInRequest: false,
                isSignedIn: true,
            }
        case '@auth/SIGN_IN_FAILURE':
            return {
                ...state,
                loadingSignInRequest: false,
                error: true,
            }
    
        default:
            return state;
    }
}