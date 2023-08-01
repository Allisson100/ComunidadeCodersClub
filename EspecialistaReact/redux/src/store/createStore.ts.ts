import { Middleware, Reducer, applyMiddleware, createStore } from 'redux'
import { AuthState , AuthActions } from './modules/auth/types'

export interface StoreState {
    auth: AuthState;
}

export type StoreAction = AuthActions;

export default (reducers: Reducer<StoreState , StoreAction>, middlewares: Middleware[]) => {
    const enhancer = applyMiddleware(... middlewares)

    return createStore(reducers , enhancer)
}