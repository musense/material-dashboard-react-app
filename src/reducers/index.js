import { combineReducers } from "redux";
import getTagReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getUserReducer from './GetUserReducer'
import getEditorClassReducer from './GetEditorClassReducer'

const rootReducer = combineReducers({
    getTagReducer: getTagReducer,
    getEditorReducer: getEditorReducer,
    getUserReducer: getUserReducer,
    getEditorClassReducer: getEditorClassReducer,
});

export default rootReducer;