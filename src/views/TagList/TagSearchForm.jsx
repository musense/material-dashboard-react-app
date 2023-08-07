import React, { useRef, useCallback } from 'react'
import DateSelector from 'components/DateSelector/DateSelector';
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import Stack from '@mui/material/Stack';
import * as GetTagsAction from 'actions/GetTagsAction';
import * as GetSearchAction from 'actions/GetSearchAction';
import { useDispatch, useSelector } from 'react-redux';

const style = {
    width: '100%',
    height: 'fit-content',
    backgroundColor: 'transparent',
    margin: '0 auto 1rem',
    '& h3': {
        textAlign: 'center',
        m: 'unset',
        mb: 2
    },
}

export default function TagSearchForm() {

    const dispatch = useDispatch()
    const title = useSelector((state) => state.getSearchReducer.title);
    const startDate = useSelector((state) => state.getSearchReducer.startDate);
    const endDate = useSelector((state) => state.getSearchReducer.endDate);

    const submitRef = useRef(null);

    usePressEnterEventHandler(submitRef)

    function onSearchEditorList(e) {
        e.preventDefault()
        if (startDate === "Invalid Date" && endDate === "Invalid Date") {
            dispatch({
                type: GetTagsAction.SET_ERROR_MESSAGE,
                payload: {
                    message: "Please select create date"
                }
            })
            return
        }
        if (startDate === "Invalid Date") {
            dispatch({
                type: GetTagsAction.SET_ERROR_MESSAGE,
                payload: {
                    message: "Please select start date"
                }
            })
            return
        }
        if (endDate === "Invalid Date") {
            dispatch({
                type: GetTagsAction.SET_ERROR_MESSAGE,
                payload: {
                    message: "Please select end date"
                }
            })
            return
        }
        const searchData = {
            title: title.length === 0 ? null : title,
            createDate: {
                startDate: startDate,
                endDate: endDate
            }
        }
        console.log("🚀 ~ file: TagSearchForm.jsx:67 ~ onSearchEditorList ~ searchData:", searchData)

        // return
        dispatch({
            type: GetTagsAction.SEARCH_TAG_LIST,
            payload: searchData
        })
        return
    }


    const onSearchFormPropertyChange = useCallback((value, property) => {
        dispatch({
            type: GetSearchAction.SET_SEARCH_FORM_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])

    const onStartDateChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'startDate')
    }, [onSearchFormPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'endDate')
    }, [onSearchFormPropertyChange])
    const reset = useCallback(() => {
        dispatch({
            type: GetSearchAction.RESET_SEARCH_FORM
        })
    }, [dispatch])
    return <Stack
        spacing={2} direction={'row'}
        useFlexGap flexWrap="wrap"
        justifyContent={'space-between'}
        sx={style}>
        <form className="tag-list-form" onSubmit={onSearchEditorList}>

            <div className="title" >
                <label htmlFor="title">標籤名稱</label>
                <input type="text" name='title'
                    value={title} onChange={e => onSearchFormPropertyChange(e.target.value, 'title')} />
            </div>

            <DateSelector
                startDate={startDate}
                endDate={endDate}
                width={'160px'}
                height={'40px'}
                onStartDateChange={onStartDateChange}
                onEndDateChange={onEndDateChange}
            />
            <div className="button-list">
                <input type='button' value='清空' onClick={reset} />
                <input ref={submitRef} type="submit" value="查詢" />
            </div>
        </form>
    </Stack>
}
