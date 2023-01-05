import { combineReducers } from "redux";
import getTagReducer from './GetTagsReducer'

const rootReducer = combineReducers({
    getTagReducer: getTagReducer
});

export default rootReducer;