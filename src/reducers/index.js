import { combineReducers } from "redux";
import getTagsReducer from './GetTagsReducer'
import getEditorReducer from './GetEditorReducer'
import getUserReducer from './GetUserReducer'
import getClassReducer from './GetClassReducer'
import getDialogReducer from './GetDialogReducer'
import getSlateReducer from './GetSlateReducer'
import getBannerReducer from './GetBannerReducer'
import getSearchReducer from './GetSearchReducer'

const rootReducer = combineReducers({
    getTagsReducer: getTagsReducer,
    getEditorReducer: getEditorReducer,
    getUserReducer: getUserReducer,
    getClassReducer: getClassReducer,
    getDialogReducer: getDialogReducer,
    getSlateReducer: getSlateReducer,
    getBannerReducer: getBannerReducer,
    getSearchReducer: getSearchReducer,
});

export default rootReducer;