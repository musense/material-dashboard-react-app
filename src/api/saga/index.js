import { all } from "redux-saga/effects";
import GetEditorList from "./GetEditorList";
import GetTagList from "./GetTagList";
import GetUserList from "./GetUserList";
import GetClassList from "./GetClassList";
import GetBannerList from "./GetBannerList";

function* rootSaga() {
  yield all([
    GetTagList(),
    GetEditorList(),
    GetUserList(),
    GetClassList(),
    GetBannerList(),
  ]);
}

export default rootSaga;
