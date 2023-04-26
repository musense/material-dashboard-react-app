import * as GetEditorAction from '../actions/GetEditorAction';
import { errorMessage } from './errorMessage';

const initialState = {
  titleList: null,
  editor: null,
  currentPage: null,
  totalCount: null,
  errorMessage: null,
}
const getEditorReducer = (state = initialState, action) => {
  // console.log("🚀 ~ file: GetEditorReducer.js:157 ~ getEditorReducer ~ action:", action)
  switch (action.type) {
    case GetEditorAction.INITIAL_EDITOR:
      return {
        ...state,
        _id: null,
        id: null,
        title: null,
        content: null,
        tags: null,
        errorMessage: null,
        titleList: null
      }

    case GetEditorAction.ADD_EDITOR_SUCCESS:
      return {
        ...state,
        _id: action.payload._id,
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content,
        errorMessage: errorMessage.addSuccess
      }
    case GetEditorAction.ADD_EDITOR_FAIL:
      return {
        ...state,
        errorMessage: errorMessage.addFail
      }
    case GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS:
      return {
        ...state,
        titleList: action.payload.titleList,
        currentPage: action.payload.currentPage,
        totalCount: action.payload.totalCount,
        errorMessage: errorMessage.getFinish
      }
    case GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL:
      return {
        ...state,
        errorMessage: errorMessage.getFail
      }
    case GetEditorAction.DELETE_EDITOR_SUCCESS:
      return {
        ...state,
        errorMessage: errorMessage.deleteSuccess
      }
    case GetEditorAction.REQUEST_EDITOR_SUCCESS:
      return {
        ...state,
        editor: action.payload,
        // _id: action.payload._id,
        // title: action.payload.title,
        // content: {
        //     title: action.payload.content.title,
        //     content: action.payload.content.content,
        // },
        // tags: action.payload.tags,
        // classifications: action.payload.classifications,
        // webHeader: {
        //     title: action.payload.webHeader.title,
        //     description: action.payload.webHeader.description,
        //     keywords: action.payload.webHeader.keywords,
        //     customUrl: action.payload.webHeader.customUrl,
        // },
        // media: {
        //     banner: action.payload.media.banner,
        //     thumbnail: action.payload.media.thumbnail,
        //     altText: action.payload.media.altText,
        // },
        // setTop: action.payload.setTop || false,
        // hide: action.payload.hide || false,
        errorMessage: errorMessage.getFinish
      }
    case GetEditorAction.REQUEST_EDITOR_FAIL:
      return {
        ...state,
        errorMessage: errorMessage.getFinish
      }
    case GetEditorAction.UPDATE_EDITOR_SUCCESS:
      return {
        ...state,
        errorMessage: errorMessage.updateSuccess
      }
    case GetEditorAction.UPDATE_EDITOR_FAIL:
      return {
        ...state,
        errorMessage: errorMessage.updateFail
      }
    default:
      return { ...state }
  }
}

export default getEditorReducer