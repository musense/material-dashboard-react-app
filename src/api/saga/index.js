import { all } from "redux-saga/effects";
import GetEditorList from "./GetEditorList";
import GetTagList from "./GetTagList";
import GetUserList from "./GetUserList";
import GetClassList from "./GetClassList";

// import GetStreamRoomList from "./GetStreamRoomList";
// import LiveGuestInfo from "./LiveGuestInfo";
// import AppGetUrlAsync from "./AppGetUrlAsync";
// import Logger from "./Logger";

function* rootSaga() {
  yield all([
      GetTagList(),
      GetEditorList(),
      GetUserList(),
      GetClassList(),
      // GetStreamRoomList(),
      // LiveGuestInfo(),
      // AppGetUrlAsync(),
      // Logger(),
    ]);
}

export default rootSaga;
