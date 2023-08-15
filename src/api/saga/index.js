import { all } from "redux-saga/effects";
import GetEditorList from "./GetEditorList";
import GetTagList from "./GetTagList";
import GetUserList from "./GetUserList";
import GetClassList from "./GetClassList";
import GetBannerList from "./GetBannerList";
// import Logger from "./Logger";

function* rootSaga() {
  yield all([
    GetTagList(),
    GetEditorList(),
    GetUserList(),
    GetClassList(),
    GetBannerList(),
    // Logger(),
  ]);
}

export default rootSaga;
