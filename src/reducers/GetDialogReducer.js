import * as GetDialogAction from '../actions/GetDialogAction';

const initialState = {
  contentData: null,
  message: null,
  confirm: null,
  messageDialogReturnValue: null,
  data: null,
  clientErrorMessage: null,
}

const getDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetDialogAction.COPY_SITEMAP:
      return {
        ...state,
        contentData: action.payload.contentData,
        message: action.payload.message,
      }
    case GetDialogAction.ON_DELETE_EDITOR:
      return {
        ...state,
        data: action.payload.data,
        contentData: action.payload.contentData,
        message: action.payload.message,
        confirm: action.payload.confirm,
      }
    case GetDialogAction.ON_MODAL_CLOSE:
      return {
        ...state,
        messageDialogReturnValue: action.payload.messageDialogReturnValue,
        contentData: null,
        message: null,
        confirm: null,
        data: null
      }
    case GetDialogAction.SET_CLIENT_MESSAGE:
      return {
        ...state,
        clientErrorMessage: action.payload.clientErrorMessage,
      }
    case "RESET_DIALOG_STATE":
      return {
        ...initialState
      }
    case "RESET_STATE_DATA": {
      return {
        ...initialState,
      }
    }
    default:
      return { ...state }
  }
}

export default getDialogReducer

const getDialogContentData = state => state.getDialogReducer.contentData;
const getDialogData = state => state.getDialogReducer.contentData;
const getDialogConfirm = state => state.getDialogReducer.confirm;
const getDialogMessageDialogReturnValue = state => state.getDialogReducer.messageDialogReturnValue;
const getDialogMessage = state => state.getDialogReducer.message;

export {
  getDialogContentData,
  getDialogData,
  getDialogConfirm,
  getDialogMessageDialogReturnValue,
  getDialogMessage,
}