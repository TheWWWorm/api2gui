import { combineReducers } from 'redux'

import api from './apiReducer'
import apiMap from './apiMapReducer'

export default combineReducers({
    api,
    apiMap,
})
