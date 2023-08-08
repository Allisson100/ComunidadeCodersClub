import { useSelector , TypedUseSelectorHook } from 'react-redux'
import { ReduxStore } from '../../store/slices/types'

export const useReduxSelector: TypedUseSelectorHook<ReduxStore> = useSelector

