import *  as GetTagsAction from '../actions/GetTagsAction';
import { errorMessage } from './errorMessage';
import sha256 from 'crypto-js/sha256'

export interface Tag {
    _id: string;
    name: string;
    title?: string;
    description?: string;
    keywords?: string;
    ['custom-url']?: string;
    sorting?: number;
    ['popular-tag']?: boolean;
    ['page-views']?: number;
    timestamp?: number;
    ['create-at']?: Date;
}

const nullTag: Tag = {
    _id: sha256('null').toString(),
    name: 'null'
};

const tagList: Tag[] = [
    {
        _id: sha256('test').toString(),
        name: 'test',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 0,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },
    {
        _id: sha256('test-2').toString(),
        name: 'test-2',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 1,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },
    {
        _id: sha256('tag-3').toString(),
        name: 'tag-3',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 6,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },
    {
        _id: sha256('tag-4').toString(),
        name: 'tag-4',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 8,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },
    {
        _id: sha256('iphone 14 Pro').toString(),
        name: 'iphone 14 Pro',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 10,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },
    {
        _id: sha256('iPad Pro').toString(),
        name: 'iPad Pro',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 20,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },
    {
        _id: sha256('AirPods Pro').toString(),
        name: 'AirPods Pro',
        title: 'test-title',
        description: 'test-description',
        keywords: 'test-keywords',
        ['custom-url']: undefined,
        sorting: 8,
        ['popular-tag']: false,
        ['page-views']: 0,
        timestamp: undefined,
        ['create-at']: undefined,
    },

]

const initialState: {
    tagList: Tag[];
    selectedTag: Tag | null;
    selectedIndex: number;
    errorMessage: string | null
} = {
    tagList: tagList,
    selectedTag: null,
    selectedIndex: -1,
    errorMessage: null
}

const getTagReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetTagsAction.ADD_TAG_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetTagsAction.UPDATE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.updateSuccess
            }
        case GetTagsAction.DELETE_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.deleteSuccess
            }
        case GetTagsAction.ADD_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.addFail
            }
        case GetTagsAction.UPDATE_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.updateFail
            }
        case GetTagsAction.DELETE_TAG_FAIL:
            return {
                ...state,
                errorMessage: errorMessage.deleteFail
            }
        case GetTagsAction.REQUEST_TAG_SUCCESS:
            return {
                ...state,
                tagList: action.payload,
                errorMessage: errorMessage.getFinish
            }
        case GetTagsAction.GET_SELECTED_TAG_SUCCESS:
            return {
                ...state,
                selectedIndex: action.payload.selectedIndex,
                selectedTag: state.tagList.filter((t, index) =>
                    index == action.payload.selectedIndex
                ).flat(),
                errorMessage: null
            }
        case GetTagsAction.UPDATE_SELECTED_TAG_SUCCESS:
            {
                const sTag = state.tagList.filter((t, index) =>
                    index == state.selectedIndex
                ).flat()
                if (JSON.stringify(sTag) === JSON.stringify(action.payload.selectedTag)) {
                    return {
                        ...state,
                        errorMessage: 'nothing to update!!!'
                    }
                }

                const uTagList = state.tagList.map((t, index) =>
                    index == state.selectedIndex ?
                        [
                            ...action.payload.selectedTag
                        ]
                        : t
                )
                return {
                    ...state,
                    tagList: uTagList,
                    selectedTag: nullTag,
                    selectedIndex: state.selectedIndex,
                    errorMessage: 'updated successfully'
                }
            }
        case GetTagsAction.DELETED_SELECTED_TAG_SUCCESS:
            {
                const oTagList = state.tagList;
                oTagList.splice(state.selectedIndex, 1)
                return {
                    ...state,
                    tagList: oTagList,
                    selectedTag: nullTag,
                    selectedIndex: -1,
                    errorMessage: 'deleted successfully'
                }
            }
        case GetTagsAction.GET_TAG_SUCCESS:
            return { ...state, tagList: action.payload, errorMessage: null }
        case GetTagsAction.GET_TAG_FAIL:
            return { ...state, errorMessage: action.payload }
        // case GetTagsAction.GET_TAG_REQUEST:

        case GetTagsAction.REQUEST_TAG:
        case GetTagsAction.UPDATE_TAG:
        case GetTagsAction.DELETE_TAG:
            return {
                ...state,
                errorMessage: null
            }
        default:
            return { ...state }
    }
}

export default getTagReducer
