import { all } from "redux-saga/effects";
import GetTagList from "./GetTagList";
// import GetStreamRoomList from "./GetStreamRoomList";
// import LiveGuestInfo from "./LiveGuestInfo";
// import AppGetUrlAsync from "./AppGetUrlAsync";
// import Logger from "./Logger";

function* rootSaga() {
  yield all([
    GetTagList(),
    // GetStreamRoomList(),
    // LiveGuestInfo(),
    // AppGetUrlAsync(),
    // Logger(),
  ]);
}

export default rootSaga;
