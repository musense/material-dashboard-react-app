import { combineReducers } from "redux";
import getTagReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getUserReducer from './GetUserReducer'
import getClassReducer from './GetClassReducer'

const rootReducer = combineReducers({
    getTagReducer: getTagReducer,
    getEditorReducer: getEditorReducer,
    getUserReducer: getUserReducer,
    getClassReducer: getClassReducer,
});

export default rootReducer;