import { createSelector } from 'reselect';
import * as GetEditorAction from '../actions/GetEditorAction';
import * as GetSlateAction from '../actions/GetSlateAction';
import { errorMessage } from './errorMessage';
import getSortedList from 'utils/getSortedList';

const initialState = {
  sortingMap: {
    serialNumber: 'asc',
    'content.title': 'asc',
    createDate: 'asc',
    updateDate: 'asc',
    status: 'asc',
    pageView: 'asc',
    'categories.name': 'asc',
  },
  selectedPatchKey: null,
  titleList: null,
  _id: '',
  editor: null,
  currentPage: null,
  totalCount: null,
  errorMessage: null,
}
const getEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GetEditorAction.ADD_NEW_EDITOR: {
      return {
        ...state,
        editor: null
      }
    }
    case GetEditorAction.ADD_EDITOR_SUCCESS:
      return {
        ...state,
        _id: action.payload._id,
        editor: action.payload.editor,
        errorMessage: errorMessage.addSuccess
      }
    case GetEditorAction.AUTH_USER_SUCCESS:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    case GetEditorAction.ADD_EDITOR_FAIL:
    case GetEditorAction.UPDATE_EDITOR_FAIL:
    case GetEditorAction.DELETE_EDITOR_FAIL:
    case GetEditorAction.AUTH_USER_FAIL: {
      let errorMessage;
      if (action.payload.errorMessage.indexOf('E11000 duplicate key error') !== -1) {
        errorMessage = 'duplicate key error'
      } else {
        errorMessage = action.payload.errorMessage
      }
      return {
        ...state,
        errorMessage: errorMessage
      }
    }
    case GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS:
      return {
        ...state,
        titleList: action.payload.titleList,
        currentPage: action.payload.currentPage,
        totalCount: action.payload.totalCount,
        errorMessage: errorMessage.getFinish
      }
    case GetEditorAction.REQUEST_EDITOR_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      }
    case GetEditorAction.SHOW_EDITOR_LIST_SORTING:
      const { key } = action.payload;
      return {
        ...state,
        titleList: getSortedList(state.titleList, key, state.sortingMap),
        sortingMap: {
          ...state.sortingMap,
          [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
        },
        selectedPatchKey: key,
        currentPage: 1
      }
    case GetEditorAction.REQUEST_EDITOR_FAIL:
    case GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
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
        errorMessage: errorMessage.getFinish
      }
    case GetEditorAction.UPDATE_EDITOR_SUCCESS:
      return {
        ...state,
        errorMessage: errorMessage.updateSuccess
      }
    case GetEditorAction.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload.message
      }
    case GetSlateAction.CHECK_BEFORE_SUBMIT:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    case "RESET_STATE_DATA": {
      return {
        ...initialState,
        sortingMap: {
          ...initialState.sortingMap
        }
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default getEditorReducer

const getEditorList = state => state.getEditorReducer.titleList && [...state.getEditorReducer.titleList]
const getCurrentPage = state => state.getEditorReducer.currentPage

const getTotalPage = state => Math.ceil(state.getEditorReducer.totalCount / 10)
const getTotalCount = state => state.getEditorReducer.totalCount

const getSelectedPatchKey = state => state.getEditorReducer.selectedPatchKey
const getEditorErrorMessage = state => state.getEditorReducer.errorMessage

const getEditorShowList = createSelector(
  [getEditorList, getCurrentPage],
  (titleList, currentPage) => {
    const start = (currentPage - 1) * 10;
    const end = start + 10
    return titleList?.slice(start, end)
  })

export {
  getCurrentPage,
  getTotalPage,
  getTotalCount,
  getSelectedPatchKey,
  getEditorErrorMessage,
  getEditorShowList,
}