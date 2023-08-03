import * as GetSlateAction from './../actions/GetSlateAction';
import dayjs from 'dayjs';

const initialState = {
  contentForm: {
    title: '',
    content: [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ],
  },
  detailForm: {
    webHeader: {
      headTitle: '',
      headDescription: '',
      headKeyword: '',
      manualUrl: '',
      sitemapUrl: '',
    },
    tags: null,
    categories: null,
    media: {
      contentImagePath: '',
      homeImagePath: '',
      altText: '',
    },
    publishInfo: {
      hidden: false,
      isScheduled: false,
      scheduledAt: ''
    }
  },
  searchForm: {
    title: '',
    categories: null,
    status: { _id: 0, name: '全部' },
    createDate: {
      startDate: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
      endDate: dayjs(new Date()).format('YYYY-MM-DD'),
    },
  },
  showUrl: '',
  updateInitialState: null,
  submitState: null,
  isPreview: false,
  isDraft: false,
  previewID: null,
  errorMessage: null,
}

const getSlateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PREVIEW_FINISHED": {
      return {
        ...state,
        isPreview: false,
        previewID: null,
      }
    }
    case GetSlateAction.PREVIEW_EDITOR_SUCCESS: {
      return {
        ...state,
        previewID: action.payload.previewID,
        errorMessage: action.payload.errorMessage,
      }
    }
    case GetSlateAction.PREVIEW_EDITOR_FAIL: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      }
    }
    case GetSlateAction.SET_DEFAULT_FORM_VALUE: {
      const {
        ...props
      } = action.payload.allProps
      const contentForm = {
        title: props.content.title || '',
        content: props.content.content || initialState.contentForm.content,
      }
      const detailForm = {
        webHeader: {
          headTitle: props.webHeader.headTitle || '',
          headDescription: props.webHeader.headDescription || '',
          headKeyword: props.webHeader.headKeyword || '',
          manualUrl: props.webHeader.manualUrl || '',
          sitemapUrl: props.sitemapUrl,
        },
        tags: props.tags || initialState.detailForm.tags,
        categories: props.categories || initialState.detailForm.categories,
        media: {
          contentImagePath: props.media.contentImagePath,
          homeImagePath: props.media.homeImagePath,
          altText: props.media.altText,
        },
        publishInfo: {
          hidden: props.hidden,
          isScheduled: props.isScheduled,
          scheduledAt: props.scheduleTime
        }
      }

      return {
        ...state,
        contentForm: JSON.parse(JSON.stringify(contentForm)),
        detailForm: JSON.parse(JSON.stringify(detailForm)),
        updateInitialState: {
          contentForm: JSON.parse(JSON.stringify(contentForm)),
          detailForm: JSON.parse(JSON.stringify(detailForm)),
        },
        showUrl: detailForm.media.contentImagePath
      }
    }
    case GetSlateAction.RESET_FORM_VALUE: {
      return {
        ...initialState,
      }
    }
    case GetSlateAction.SET_SHOW_URL: {
      return {
        ...state,
        showUrl: action.payload.showUrl,
      }
    }
    case GetSlateAction.SET_SEARCH_FORM_PROPERTY: {
      const { property, value, detail } = action.payload.allProps
      return detail ? {
        ...state,
        searchForm: {
          ...state.searchForm,
          [property]: {
            ...state.searchForm[property],
            [detail]: value,
          }
        }
      } : {
        ...state,
        searchForm: {
          ...state.searchForm,
          [property]: value,
        }
      }
    }
    case GetSlateAction.RESET_SEARCH_FORM: {
      return {
        ...state,
        searchForm: {
          ...initialState.searchForm
        }
      }
    }
    case GetSlateAction.SET_PROPERTY: {
      const { form, info, property, value } = action.payload.allProps
      return info ? {
        ...state,
        [form]: {
          ...state[form],
          [info]: {
            ...state[form][info],
            [property]: value,
          }
        }
      } : {
        ...state,
        [form]: {
          ...state[form],
          [property]: value,
        }
      }
    }

    case GetSlateAction.CHECK_BEFORE_SUBMIT: {
      const isPreview = action.payload.isPreview
      const submitState = JSON.parse(JSON.stringify({ ...state.contentForm, ...state.detailForm }))
      let errorMessage,
        cachedInitialState,
        trimmedState

      if (action.payload.errorMessage) {
        errorMessage = action.payload.errorMessage
      } else {
        errorMessage = generateErrorMessage(state, initialState)
      }
      if (errorMessage) {
        return {
          ...state,
          errorMessage: errorMessage
        }
      } else {
        if (isPreview) {
          trimmedState = { ...submitState }
          return {
            ...state,
            submitState: trimmedState,
            isPreview: isPreview,
            errorMessage: 'check__OK!'
          }
        }
        // cloneDeep
        const createType = action.payload.createType

        if (createType === "add_new") {
          cachedInitialState = JSON.parse(JSON.stringify({ ...initialState.contentForm, ...initialState.detailForm }))
          trimmedState = recurseCheckAndDelete(submitState, cachedInitialState, createType)
        } else if (createType === "update") {
          cachedInitialState = JSON.parse(JSON.stringify({ ...state.updateInitialState.contentForm, ...state.updateInitialState.detailForm }))
          trimmedState = recurseCheckAndDelete(submitState, cachedInitialState, createType)
          errorMessage = generateErrorMessage(trimmedState)
        } else {
          throw new Error('invalid createType')
        }
      }
      // return
      return {
        ...state,
        submitState: trimmedState,
        isPreview: false,
        errorMessage: errorMessage || 'check__OK!'
      }
    }
    case "SET_ERROR_MESSAGE": {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    }
    case "RESET_STATE_DATA": {
      return {
        ...initialState,
        errorMessage: '--reset-error-message'
      }
    }
    default:
      return { ...state }
  }

}

export default getSlateReducer


function recurseCheckAndDelete(state, initialState, createType) {
  if (createType === "add_new") {
    for (const key in initialState) {
      const value = initialState[key];
      if (key.toLowerCase().includes('image')) {
        if (state[key] === '') {
          delete state[key]
        }
      } else if (Array.isArray(value)) {
        if (JSON.stringify(value) === JSON.stringify(state[key])) {
          delete state[key]
        }
      } else if (value && typeof value === 'object') {
        const trimmedState = recurseCheckAndDelete(state[key], value, createType)
        if (trimmedState && Object.values(trimmedState).length === 0) {
          delete state[key]
        }
      }
      if (JSON.stringify(value) === JSON.stringify(state[key])) {
        delete state[key]
      }
    }
  } else if (createType === "update") {
    for (const key in initialState) {
      const value = initialState[key];
      if (typeof value === 'object' && Array.isArray(value)) {
        if (JSON.stringify(value) === JSON.stringify(state[key])) {
          delete state[key]
        }
      } else if (typeof value === 'object') {
        const trimmedState = recurseCheckAndDelete(state[key], value, createType)
        if (trimmedState && Object.values(trimmedState).length === 0) {
          delete state[key]
        }
      }
      if (JSON.stringify(value) === JSON.stringify(state[key])) {
        delete state[key]
      }
    }
  }

  return state
}
function generateErrorMessage(state, initialState = null) {
  if (Object.keys(state).length === 0) {
    return 'nothing to update!'
  }
  if (!initialState) return
  if (`${JSON.stringify(state.contentForm)}${JSON.stringify(state.detailForm)}`
    === `${JSON.stringify(initialState.contentForm)}${JSON.stringify(initialState.detailForm)}`) {
    return 'nothing to add!'
  }
  if (state.contentForm.title === '' && JSON.stringify(state.contentForm.content) === '[{"type":"paragraph","children":[{"text":""}]}]') {
    return 'content title required!'
  }
  if (state.contentForm.title === '') {
    return 'title required!'
  }
  if (JSON.stringify(state.contentForm.content) === '[{"type":"paragraph","children":[{"text":""}]}]') {
    return 'content required!'
  }
  return undefined
}