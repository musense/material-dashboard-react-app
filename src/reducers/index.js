import { combineReducers } from "redux";
import getTagsReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getUserReducer from './GetUserReducer'
import getClassReducer from './GetClassReducer'
import getDialogReducer from './GetDialogReducer'
import getSlateReducer from './GetSlateReducer'

const rootReducer = combineReducers({
    getTagsReducer: getTagsReducer,
    getEditorReducer: getEditorReducer,
    getUserReducer: getUserReducer,
    getClassReducer: getClassReducer,
    getDialogReducer: getDialogReducer,
    getSlateReducer: getSlateReducer,
});

export default rootReducer;