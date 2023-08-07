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
        name: '',
        hyperlink: '',
        sorting: 1,
        media: {
            contentImagePath: '',
            homeImagePath: '',
            altText: '',
        },
        publishInfo: {
            isOnShelvesImmediate: false,
            isPermanent: false,
            startDate: null,
            endDate: null,
        },
        note: null,
        isEditing: false,
        showUrl: null,
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
        case GetBannerAction.SET_SHOW_URL: {
            return {
                ...state,
                selectedBanner: {
                    ...state.selectedBanner,
                    showUrl: action.payload.showUrl,
                },
            }
        }
        case GetBannerAction.SET_BANNER_PROPERTY: {
            const { property, value, info } = action.payload.allProps
            return info ? {
                ...state,
                selectedBanner: {
                    ...state.selectedBanner,
                    [info]: {
                        ...state.selectedBanner[info],
                        [property]: value,
                    }
                }
            } : {
                ...state,
                selectedBanner: {
                    ...state.selectedBanner,
                    [property]: value,
                }
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
                showBannerList: state.bannerList
                    ? state.bannerList.sort((banner1, banner2) => {
                        let typeOf = typeof banner1[key]
                        let e1, e2
                        e1 = banner1[key]
                        e2 = banner2[key]
                        typeOf = typeof new Date(tag1[key]).getMonth === 'function' ? 'date' : typeOf
                        const sorting = state.sortingMap[key]
                        switch (typeOf) {
                            case 'string': {
                                if (sorting === 'asc') {
                                    return e2.localeCompare(e1)
                                } else {
                                    return e1.localeCompare(e2)
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
                                    return parseInt(e2) - parseInt(e1)
                                } else {
                                    return parseInt(e1) - parseInt(e2)

                                }
                            }
                            case 'date': {
                                if (sorting === 'asc') {
                                    return (new Date(e2)).getTime() - (new Date(e1)).getTime()
                                } else {
                                    return (new Date(e1)).getTime() - (new Date(e2)).getTime()
                                }
                            }

                        }
                    }).slice(0, 10)
                    : null,
                sortingMap: {
                    ...state.sortingMap,
                    [key]: state.sortingMap[key] === 'asc' ? 'desc' : 'asc',
                },
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
                sortingMap: {
                    ...initialState.sortingMap
                },
                selectedBanner: {
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
