import * as GetSlateAction from './../actions/GetSlateAction';
import * as GetUserAction from './../actions/GetUserAction';

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
      hide: false,
      isScheduled: false,
      scheduledAt: ''
    }
  },
  submitState: null,
  errorMessage: null,
}

const getSlateReducer = (state = initialState, action) => {
  console.log("🚀 ~ file: GetSlateReducer.js:30 ~ getSlateReducer ~ action:", action)
  switch (action.type) {
    case GetSlateAction.SET_DEFAULT_FORM_VALUE: {
      const {
        ...props
      } = action.payload.allProps
      return {
        ...state,
        contentForm: {
          title: props.content.title || '',
          content: props.content.content || initialState.contentForm.content,
        },
        detailForm: {
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
            hide: props.hide,
            isScheduled: props.isScheduled,
            scheduledAt: props.scheduleTime
          }
        },
      }
    }
    case GetSlateAction.RESET_FORM_VALUE: {
      return {
        ...initialState,
      }
    }
    case GetSlateAction.SET_PROPERTY: {
      const { form, info, property, value } = action.payload.allProps
      console.log("🚀 ~ file: GetSlateReducer.js:80 ~ getSlateReducer ~ form:", form)
      console.log("🚀 ~ file: GetSlateReducer.js:80 ~ getSlateReducer ~ info:", info)
      console.log("🚀 ~ file: GetSlateReducer.js:80 ~ getSlateReducer ~ property:", property)
      console.log("🚀 ~ file: GetSlateReducer.js:80 ~ getSlateReducer ~ value:", value)

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
      let errorMessage
      if (action.payload.errorMessage) {
        errorMessage = action.payload.errorMessage
      } else {
        errorMessage = generateErrorMessage(state, initialState)
      }
      console.log("🚀 ~ file: GetSlateReducer.js:108 ~ getSlateReducer ~ errorMessage:", errorMessage)
      if (errorMessage) {
        return {
          ...state,
          errorMessage: errorMessage
        }
      } else {
        // cloneDeep
        const trimState = JSON.parse(JSON.stringify({...state.contentForm, ...state.detailForm}))

        const trimmedState = recurseCheckAndDelete({...state.contentForm,...state.detailForm}, trimState)
        console.log("🚀 ~ file: GetSlateReducer.js:141 ~ getSlateReducer ~ state:", state)
        console.log("🚀 ~ file: GetSlateReducer.js:141 ~ getSlateReducer ~ trimmedState:", trimmedState)
        return {
          ...state,
          submitState: trimmedState,
          errorMessage: 'check__OK!'
        }
      }
    }
    case GetUserAction.LOGOUT_USER: {
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


function recurseCheckAndDelete(state, trimState) {
  for (const key in state) {
    const value = state[key];
    if (!value || value === '') { delete trimState[key] }
    else if (typeof value === 'object') {
      const trimmedState = recurseCheckAndDelete(value, trimState[key])
      if (Object.values(trimmedState).length === 0) {
        delete trimState[key]
      }
    }
  }

  return trimState
}
function generateErrorMessage(state, initialState) {
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