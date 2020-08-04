import { combineReducers } from 'redux'
import { CatalogReducer } from './CatalogReducer'
import { UserReducer } from './UserReducer'

export const reducers = combineReducers({
    CatalogReducer, UserReducer
})