import * as GetEditorAction from '../actions/GetEditorAction';
import { errorMessage } from './errorMessage';

const titleViewList = [
    {
        _id: '70a37754eb5a2e7db8cd887aaf11cda7',
        'serial-number': 1,
        title: 'test-1',
        description: '',
        keywords: '',
        'custom-url': '',
        tags: [],
        forceHidden: true,
        'is-recommend': true,
        'context-title': '',
        'context': '',
        classification: 'test-class-1',
        // thumbnail: {
        //     src: 'static/media/register.jpeg',
        //     alt: 'register'
        // },
        'film-url': {
            url: 'https://youtu.be/KXMg7FRBl_k',
            title: '3 Things Great Developers Do That Make Them More Hireable',
            thumbnail: 'https://img.youtube.com/vi/KXMg7FRBl_k/0.jpg'
        },
        createAt: '2023-03-03 00:00:00',
        published: true,
    },
    {
        _id: 'f54bfb358eb834a6589301335e426f35',
        'serial-number': 2,
        title: 'test-test-2',
        description: '',
        keywords: '',
        'custom-url': '',
        tags: [],
        forceHidden: true,
        'is-recommend': true,
        'context-title': '',
        'context': '',
        classification: 'test-class-class-2-2',
        thumbnail: {
            src: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            alt: 'camera woman'
        },
        // 'film-url': {
        //     url: 'https://youtu.be/wPDl_XuUGqY',
        //     title: '心情放鬆的歌曲🎵 在疲憊的一天之後安慰你的歌曲 - 熱門歌曲靈魂歌曲 2022',
        //     thumbnail: 'https://img.youtube.com/vi/wPDl_XuUGqY/0.jpg'
        // },
        createAt: '2019-03-04 12:32:34',
        published: false,
    },
    {
        _id: 'ab21989fd95cf1824bd67656479eb041',
        'serial-number': 3,
        title: 'title1-title2-title3-3',
        description: '',
        keywords: '',
        'custom-url': '',
        tags: [],
        forceHidden: true,
        'is-recommend': true,
        'context-title': '',
        'context': '',
        classification: 'test-class-class-2-2',
        // thumbnail: {
        //     src: 'static/media/cover.jpeg',
        //     alt: 'cover'
        // },
        'film-url': {
            url: 'https://youtu.be/Ks_QkNTbGJY',
            title: '終將徹底改變一切的Web3.0 | 老高與小茉 Mr & Mrs Gao',
            thumbnail: 'https://img.youtube.com/vi/Ks_QkNTbGJY/0.jpg'
        },
        createAt: '2023-03-01 15:59:04',
        published: false,
    },
    {
        _id: '07d1d92c83e9f277106cb46f896904af',
        'serial-number': 4,
        title: 'title2-title2-title4-3',
        description: '',
        keywords: '',
        'custom-url': '',
        tags: [],
        forceHidden: true,
        'is-recommend': true,
        'context-title': '',
        'context': '',
        classification: 'test-class2-class-2-2',
        // thumbnail: {
        //     src: 'static/media/cover.jpeg',
        //     alt: 'cover'
        // },
        // 'film-url': {
        //     url: 'https://youtu.be/Ks_QkNTbGJY',
        //     title: '終將徹底改變一切的Web3.0 | 老高與小茉 Mr & Mrs Gao',
        //     thumbnail: 'https://img.youtube.com/vi/Ks_QkNTbGJY/0.jpg'
        // },
        createAt: '2023-02-01 18:01:12',
        published: false,
    },
    {
        _id: '59ce41925f68d41469f382256a73c05a',
        'serial-number': 5,
        title: 'title3-title2-title5-5',
        description: '',
        keywords: '',
        'custom-url': '',
        tags: [],
        forceHidden: true,
        'is-recommend': true,
        'context-title': '',
        'context': '',
        classification: 'test-class5-class-2-5',
        thumbnail: {
            src: 'https://images.unsplash.com/photo-1679926820639-56c6f62e516e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            alt: 'director'
        },
        // 'film-url': {
        //     url: 'https://youtu.be/Ks_QkNTbGJY',
        //     title: '終將徹底改變一切的Web3.0 | 老高與小茉 Mr & Mrs Gao',
        //     thumbnail: 'https://img.youtube.com/vi/Ks_QkNTbGJY/0.jpg'
        // },
        createAt: '2023-03-28 09:46:23',
        published: true,
    },
]

const initialState = {
    _id: null,
    id: null,
    title: null,
    content: null,
    tags: null,
    errorMessage: null,
    titleList: titleViewList
}
const getEditorReducer = (state = initialState, action) => {
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
                titleList: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetEditorAction.REQUEST_EDITOR_TITLE_LIST_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.getFail
            }
        case GetEditorAction.REQUEST_EDITOR_SUCCESS:
            return {
                ...state,
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                tags: action.payload.tags,
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
        case GetEditorAction.REQUEST_EDITOR:
        case GetEditorAction.UPDATE_EDITOR:
        case GetEditorAction.DELETE_EDITOR:
            return {
                ...state,
                errorMessage: null
            }
        case GetEditorAction.BUNCH_DELETE_CLASS:
            return {
                ...state,
                titleList:
                    state.titleList
                        .filter(title => !action.payload.data.includes(title._id)),
                errorMessage: null
            }
        default:
            return { ...state }
    }
}

export default getEditorReducer