import * as GetDialogAction from '../actions/GetDialogAction';

const initialState = {
  title: null,
  message: null,
  confirm: null,
  messageDialogReturnValue: null,
  data: null
}

const getDialogReducer = (state = initialState, action) => {
  // console.log("🚀 ~ file: getDialogReducer.js:157 ~ getDialogReducer ~ action:", action)
  switch (action.type) {
    case GetDialogAction.COPY_SITEMAP:
      return {
        ...state,
        title: action.payload.title,
        message: action.payload.message,
      }
    case GetDialogAction.ON_DELETE_EDITOR:
      return {
        ...state,
        data: action.payload.data,
        title: action.payload.title,
        message: action.payload.message,
        confirm: action.payload.confirm,
      }
    case GetDialogAction.ON_MODAL_CLOSE:
      return {
        ...state,
        messageDialogReturnValue: action.payload.messageDialogReturnValue,
        title: null,
        message: null,
        confirm: null,
        data: null
      }
    case GetDialogAction.ON_MODAL_CLOSE:
      return {
        ...initialState,
      }
    default:
      return { ...state }
  }
}

export default getDialogReducer