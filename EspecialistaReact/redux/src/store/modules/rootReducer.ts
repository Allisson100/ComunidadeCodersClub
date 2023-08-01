import { combineReducers } from 'redux'

import auth from './auth/reducer'
import { StoreState } from '../createStore.ts'

export default combineReducers<StoreState>({
    auth,
})

