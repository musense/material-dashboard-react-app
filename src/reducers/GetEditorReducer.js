import * as GetEditorAction from '../actions/GetEditorAction';
import { errorMessage } from './errorMessage';

const initialState = {
  sortingMap: {
    serialNumber: 'asc',
    'content.title': 'asc',
    createDate: 'asc',
    updateDate: 'asc',
    status: 'asc',
    pageView: 'asc',
    'classifications.label': 'asc',
  },
  showList: null,
  titleList: null,
  editor: null,
  currentPage: null,
  totalPage: null,
  totalCount: null,
  errorMessage: null,
  previewID: null,

}
const getEditorReducer = (state = initialState, action) => {
  // console.log("🚀 ~ file: GetEditorReducer.js:157 ~ getEditorReducer ~ action:", action)
  switch (action.type) {
    case GetEditorAction.PREVIEW_EDITOR_SUCCESS: {
      return {
        ...state,
        previewID: action.payload.previewID,
        errorMessage: action.payload.errorMessage,
      }
    }
    case GetEditorAction.RESET_EDITOR: {
      return {
        ...state,
        editor: null
      }
    }
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
        editor: action.payload.editor,
        errorMessage: errorMessage.addSuccess
      }
    case GetEditorAction.ADD_EDITOR_FAIL:
    case GetEditorAction.UPDATE_EDITOR_FAIL:
    case GetEditorAction.DELETE_EDITOR_FAIL: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    }
    case GetEditorAction.REQUEST_EDITOR_TITLE_LIST_SUCCESS:
      return {
        ...state,
        titleList: action.payload.titleList,
        showList: action.payload.titleList.slice(0, 10),
        currentPage: action.payload.currentPage,
        totalPage: Math.ceil(action.payload.totalCount / 10),
        totalCount: action.payload.totalCount,
        errorMessage: errorMessage.getFinish
      }
    case GetEditorAction.REQUEST_EDITOR_PAGE:
      const start = (action.payload - 1) * 10;
      const end = start + 10
      return {
        ...state,
        showList: state.titleList.slice(start, end),
        currentPage: action.payload,
      }
    case GetEditorAction.SHOW_EDITOR_LIST_SORTING:
      const { key } = action.payload;
      return {
        ...state,
        sortingMap: {
          ...state.sortingMap,
          [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
        },
        showList: state.titleList.sort((editor1, editor2) => {
          let typeOf
          let e1, e2,
            k1, k2;

          if (key.indexOf('.') !== -1) {
            k1 = key.split('.')[0]
            k2 = key.split('.')[1]
            e1 = editor1[k1][k2]
            e2 = editor2[k1][k2]
            typeOf = typeof editor1[k1][k2]
          } else {
            e1 = editor1[key]
            e2 = editor2[key]
            typeOf = typeof editor1[key]
          }
          const sorting = state.sortingMap[key]
          switch (typeOf) {
            case 'string': {
              if (sorting === 'asc') {
                return e1.localeCompare(e2)
              } else {
                return e2.localeCompare(e1)
              }
            }
            case 'boolean': {
              if (sorting === 'asc') {
                return e2.toString().localeCompare(e1.toString())
              } else {
                return e1.toString().localeCompare(e2.toString())
              }
            }
            case 'number': {
              if (sorting === 'asc') {
                return parseInt(e2 ? e2 : 0) - parseInt(e1 ? e1 : 0)
              } else {
                return parseInt(e1 ? e1 : 0) - parseInt(e2 ? e2 : 0)

              }
            }
            case 'object': {
              if (sorting === 'asc') {
                return (new Date(e2)).getTime() - (new Date(e1)).getTime()
              } else {
                return (new Date(e1)).getTime() - (new Date(e1)).getTime()
              }
            }

          }
        }).slice(0, 10),
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
        errorMessage: action.payload.message
      }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default getEditorReducer