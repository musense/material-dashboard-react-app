import *  as GetBannerAction from '../actions/GetBannerAction';
import { errorMessage } from './errorMessage';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const initialState = {
    sortingMap: {
        serialNumber: 'asc',
        name: 'asc',
        sort: 'asc',
        hyperlink: 'asc',
        startDate: 'asc',
        status: 'asc',
    },
    bannerList: null,
    selectedBanner: {
        _id: '',
        serialNumber: 0,
        name: '',
        sort: 1,
        hyperlink: '',
        remark: '',
        eternal: false,
        display: 0,
        media: {
            homeImagePath: '',
            contentImagePath: '',
        },
        startDate: '',
        endDate: '',
        status: '',
    },
    showUrl: '',
    currentPage: null,
    totalCount: null,
    isEditing: false,
    errorMessage: null,
}

const getBannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetBannerAction.CANCEL_EDITING_BANNER: {
            return {
                ...state,
                selectedBanner: {
                    ...initialState.selectedBanner,
                },
                isEditing: false
            }
        }
        case GetBannerAction.SET_SHOW_URL: {
            return {
                ...state,
                showUrl: action.payload.showUrl,
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
            const banner = action.payload.data;
            console.log("🚀 ~ file: GetBannerReducer.js:81 ~ getBannerReducer ~ banner:", banner)
            return {
                ...state,
                selectedBanner: {
                    _id: banner._id,
                    serialNumber: banner.serialNumber,
                    name: banner.name,
                    sort: banner.sort,
                    hyperlink: banner.hyperlink,
                    remark: banner.remark,
                    eternal: banner.eternal,
                    display: banner.display,
                    media: {
                        homeImagePath: banner.homeImagePath,
                        contentImagePath: banner.contentImagePath,
                    },
                    startDate: banner.startDate,
                    endDate: banner.endDate,
                    createdAt: banner.createdAt,
                    updatedAt: banner.updatedAt,
                    status: banner.status,
                },
                showUrl: banner.homeImagePath,
                isEditing: true,
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
                currentPage: action.payload
            }
        case GetBannerAction.SHOW_BANNER_LIST_SORTING:
            const { key } = action.payload;
            return {
                ...state,
                bannerList: state.bannerList
                    ? state.bannerList.sort((banner1, banner2) => {
                        let typeOf = typeof banner1[key]
                        let k1, k2, e1, e2
                        if (key.indexOf('.') !== -1) {
                            k1 = key.split('.')[0]
                            k2 = key.split('.')[1]
                            e1 = banner1[k1][k2]
                            e2 = banner2[k1][k2]
                            typeOf = typeof banner1[k1][k2]
                        } else {
                            e1 = banner1[key]
                            e2 = banner2[key]
                            typeOf = typeof banner1[key]
                        }
                        // typeOf = typeof new Date(e1).getMonth === 'function' ? 'date' : typeOf
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

const getShowList = state => state.getBannerReducer.bannerList
    && state.getBannerReducer.bannerList.slice(
        (state.getBannerReducer.currentPage - 1) * 10,
        (state.getBannerReducer.currentPage - 1) * 10 + 10
    )


const getIsEditing = state => state.getBannerReducer.isEditing
const getShowUrl = state => state.getBannerReducer.showUrl

export {
    getIsEditing,
    getShowUrl,
    getShowList
}