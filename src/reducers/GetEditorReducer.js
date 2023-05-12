import * as GetEditorAction from '../actions/GetEditorAction';
import { errorMessage } from './errorMessage';

const initialState = {
  sortingMap: {
    serialNumber: 'asc',
    'content.title': 'asc',
    createDate: 'asc',
  },
  showList: null,
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
        showList: action.payload.titleList.slice(0, 10),
        currentPage: action.payload.currentPage,
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