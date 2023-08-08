import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/slices/types'

export const useReduxDispatch = () => useDispatch<AppDispatch>()