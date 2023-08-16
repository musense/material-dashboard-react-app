import { all } from "redux-saga/effects";
import GetEditorList from "./GetEditorList";
import GetTagList from "./GetTagList";
import GetUserList from "./GetUserList";
import GetClassList from "./GetClassList";

function* rootSaga() {
  yield all([
    GetTagList(),
    GetEditorList(),
    GetUserList(),
    GetClassList(),
  ]);
}

export default rootSaga;
