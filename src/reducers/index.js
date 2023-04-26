import { combineReducers } from "redux";
import getTagsReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getUserReducer from './GetUserReducer'
import getClassReducer from './GetClassReducer'

const rootReducer = combineReducers({
    getTagsReducer: getTagsReducer,
    getEditorReducer: getEditorReducer,
    getUserReducer: getUserReducer,
    getClassReducer: getClassReducer,
});

export default rootReducer;