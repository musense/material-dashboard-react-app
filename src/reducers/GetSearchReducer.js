import * as GetSearchAction from './../actions/GetSearchAction';
import dayjs from 'dayjs';

const initialState = {
    title: '',
    categories: null,
    status: { _id: 0, name: '全部' },
    startDate: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
    endDate: dayjs(new Date()).format('YYYY-MM-DD'),
    errorMessage: null,
}

const getSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetSearchAction.SET_SEARCH_FORM_PROPERTY: {
            const { property, value } = action.payload.allProps
            return {
                ...state,
                [property]: value,
            }
        }
        case GetSearchAction.RESET_SEARCH_FORM: {
            return {
                ...initialState
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

export default getSearchReducer
