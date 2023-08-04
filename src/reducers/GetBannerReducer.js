import *  as GetBannerAction from '../actions/GetBannerAction';
import { errorMessage } from './errorMessage';

const initialState = {
    sortingMap: {
        sorting: 'asc',
        name: 'asc',
        createDate: 'asc',
        isHot: 'asc',
    },
    bannerList: null,
    showBannerList: null,
    selectedBanner: {
        id: '',
        bannerName: '',
        title: '',
        description: '',
        keywords: '',
        manualUrl: '',
        customUrl: '',
        popular: false,
        sorting: 1,
        isEditing: false,
    },
    selectedIndex: -1,
    currentPage: null,
    totalPage: null,
    totalCount: null,
    errorMessage: null,
}

const getBannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetBannerAction.CANCEL_EDITING_BANNER: {
            return {
                ...state,
                selectedBanner: {
                    ...initialState.selectedBanner,
                    isEditing: false
                },
            }
        }
        case GetBannerAction.SET_BANNER_PROPERTY: {
            const { property, value } = action.payload.allProps
            return {
                ...state,
                selectedBanner: {
                    ...state.selectedBanner,
                    [property]: value
                },
            }
        }
        case GetBannerAction.EDITING_BANNER:
            const banner = action.payload.data
            return {
                ...state,
                selectedBanner: {
                    id: banner._id,
                    bannerName: banner.name,
                    title: banner.webHeader.title,
                    description: banner.webHeader.description,
                    keywords: banner.webHeader.keywords,
                    manualUrl: banner.webHeader.manualUrl,
                    customUrl: banner.webHeader.customUrl,
                    popular: banner.popular,
                    sorting: banner.sorting,
                    isEditing: true,
                },
            }
        case GetBannerAction.ADD_BANNER_SUCCESS:
            return {
                ...state,
                errorMessage: errorMessage.addSuccess
            }
        case GetBannerAction.UPDATE_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload,
                errorMessage: errorMessage.updateSuccess
            }
        case GetBannerAction.DELETE_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload,
                errorMessage: errorMessage.deleteSuccess
            }
        case GetBannerAction.ADD_BANNER_FAIL:
        case GetBannerAction.UPDATE_BANNER_FAIL:
        case GetBannerAction.DELETE_BANNER_FAIL: {
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
        case GetBannerAction.REQUEST_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload.bannerList,
                showBannerList: action.payload.bannerList.slice(0, 10),
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount,
                totalPage: Math.ceil(action.payload.totalCount / 10),
                errorMessage: errorMessage.getFinish
            }
        case GetBannerAction.REQUEST_BANNER_PAGE:
            const start = (action.payload - 1) * 10;
            const end = start + 10
            return {
                ...state,
                showBannerList: state.bannerList.slice(start, end),
                currentPage: action.payload
            }
        case GetBannerAction.SHOW_BANNER_LIST_SORTING:
            const { key } = action.payload;
            return {
                ...state,
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
                showBannerList: state.bannerList
                    ? state.bannerList.sort((banner1, banner2) => {
                        const typeOf = typeof banner1[key]
                        const sorting = state.sortingMap[key]
                        switch (typeOf) {
                            case 'string': {
                                if (sorting === 'asc') {
                                    return banner2[key].localeCompare(banner1[key])
                                } else {
                                    return banner1[key].localeCompare(banner2[key])
                                }
                            }
                            case 'boolean': {
                                if (sorting === 'asc') {
                                    return banner2[key].toString().localeCompare(banner1[key].toString())
                                } else {
                                    return banner1[key].toString().localeCompare(banner2[key].toString())
                                }
                            }
                            case 'number': {
                                if (sorting === 'asc') {
                                    return parseInt(banner2[key] ? banner2[key] : 0) - parseInt(banner1[key] ? banner1[key] : 0)
                                } else {
                                    return parseInt(banner1[key] ? banner1[key] : 0) - parseInt(banner2[key] ? banner2[key] : 0)

                                }
                            }
                            case 'object': {
                                if (sorting === 'asc') {
                                    return (new Date(banner2[key])).getTime() - (new Date(banner1[key])).getTime()
                                } else {
                                    return (new Date(banner1[key])).getTime() - (new Date(banner1[key])).getTime()
                                }
                            }

                        }
                    }).slice(0, 10)
                    : null,
                currentPage: 1
            }
        case GetBannerAction.GET_BANNER_SUCCESS:
            return {
                ...state,
                bannerList: action.payload,
                errorMessage: null
            }

        case GetBannerAction.GET_BANNER_FAIL:
        case GetBannerAction.REQUEST_POPULAR_BANNER_FAIL: {
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        }
        case GetBannerAction.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload.message
            }
        }
        case GetBannerAction.UPDATE_BANNER:
        case GetBannerAction.DELETE_BANNER:
            return {
                ...state,
                errorMessage: null
            }
        case "RESET_STATE_DATA": {
            return {
                ...initialState,
                sortingMap:{
                    ...initialState.sortingMap
                },
                selectedBanner:{
                    ...initialState.selectedBanner
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

export default getBannerReducer
