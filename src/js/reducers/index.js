import { combineReducers } from 'redux';

import api from './apiReducer';
import apiMap from './apiMapReducer';
import navigation from './navigationReducer';
import settings from './settingsReducer';

export default combineReducers({
    api,
    apiMap,
    navigation,
    settings
});
