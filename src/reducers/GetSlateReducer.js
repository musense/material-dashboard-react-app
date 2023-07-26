import * as GetSlateAction from './../actions/GetSlateAction';

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
      title: '',
      description: '',
      keywords: '',
      manualUrl: '',
      sitemapUrl: '',
    },
    tags: null,
    classifications: null,
    media: {
      banner: '',
      image: '',
      altText: '',
    },
    publishInfo: {
      hidden: null,
      isScheduled: null,
      reservedPublishDateTime: null
    }
  },
  errorMessage: null,
}

const getSlateReducer = (state = initialState, action) => {
  console.log("🚀 ~ file: GetSlateReducer.js:30 ~ getSlateReducer ~ action:", action)
  switch (action.type) {
    case GetSlateAction.SET_DEFAULT_FORM_VALUE: {
      const {
        ...props
      } = action.payload.form
      return {
        ...state,
        contentForm: {
          title: props.content.title,
          content: props.content.content,
        },
        detailForm: {
          webHeader: {
            title: props.webHeader.headTitle,
            description: props.webHeader.headDescription,
            keywords: props.webHeader.headKeyword,
            manualUrl: props.webHeader.manualUrl,
            sitemapUrl: props.sitemapUrl,
          },
          tags: props.tags,
          classifications: props.classifications,
          media: {
            banner: props.media.banner,
            image: props.media.thumbnail,
            altText: props.media.altText,
          },
          publishInfo: {
            hidden: props.hide,
            isScheduled: props.isScheduled,
            reservedPublishDateTime: props.scheduleTime
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
    default:
      return { ...state }
  }
}

export default getSlateReducer