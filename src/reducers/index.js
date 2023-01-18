import { combineReducers } from "redux";
import getTagReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getUserReducer from './GetUserReducer'

const rootReducer = combineReducers({
    getTagReducer: getTagReducer,
    getEditorReducer: getEditorReducer,
    getUserReducer: getUserReducer,
});

export default rootReducer;