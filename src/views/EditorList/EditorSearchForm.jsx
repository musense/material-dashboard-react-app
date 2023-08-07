import React, { useRef, useCallback } from 'react'
import DateSelector from 'components/DateSelector/DateSelector';
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import Stack from '@mui/material/Stack';
import * as GetEditorAction from 'actions/GetEditorAction';
import * as GetsSearchAction from 'actions/GetSearchAction';

import { useDispatch, useSelector } from 'react-redux';
import SingleClassificationSelect from 'components/Select/SingleClassificationSelect';
import SingleStatusSelect from 'components/Select/SingleStatusSelect';

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

export default function EditorSearchForm() {

    const dispatch = useDispatch();
    const title = useSelector((state) => state.getSearchReducer.title);
    const categories = useSelector((state) => state.getSearchReducer.categories);
    const status = useSelector((state) => state.getSearchReducer.status);
    const startDate = useSelector((state) => state.getSearchReducer.startDate);
    const endDate = useSelector((state) => state.getSearchReducer.endDate);

    const submitRef = useRef(null);

    usePressEnterEventHandler(submitRef);

    function onSearchEditorList(e) {
        e.preventDefault()
        if (startDate === "Invalid Date" && endDate === "Invalid Date") {
            dispatch({
                type: GetEditorAction.SET_ERROR_MESSAGE,
                payload: {
                    message: "Please select create date"
                }
            })
            return
        }
        if (startDate === "Invalid Date") {
            dispatch({
                type: GetEditorAction.SET_ERROR_MESSAGE,
                payload: {
                    message: "Please select start date"
                }
            })
            return
        }
        if (endDate === "Invalid Date") {
            dispatch({
                type: GetEditorAction.SET_ERROR_MESSAGE,
                payload: {
                    message: "Please select end date"
                }
            })
            return
        }
        const searchData = {
            title: title.length === 0 ? null : title,
            categories: categories?.name,
            status: status?.name,
            createDate: {
                startDate: startDate,
                endDate: endDate
            }
        }
        console.log("🚀 ~ file: EditorList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)

        // return
        dispatch({
            type: GetEditorAction.SEARCH_EDITOR_LIST,
            payload: searchData
        })
        return
    }

    const onSearchFormPropertyChange = useCallback((value, property) => {
        dispatch({
            type: GetsSearchAction.SET_SEARCH_FORM_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])

    const onClassificationChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'categories')
    }, [onSearchFormPropertyChange])

    const onStatusChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'status')
    }, [onSearchFormPropertyChange])

    const onStartDateChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'startDate')
    }, [onSearchFormPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'endDate')
    }, [onSearchFormPropertyChange])

    const reset = useCallback(() => {
        dispatch({
            type: GetsSearchAction.RESET_SEARCH_FORM
        })
    }, [dispatch])

    return <Stack
        spacing={2} direction={'row'}
        useFlexGap flexWrap="wrap"
        justifyContent={'space-between'}
        sx={style}>
        <form className="editor-list-form" onSubmit={onSearchEditorList}>
            <div className="title" >
                <label htmlFor="title">標題</label>
                <input type="text" name='title'
                    value={title} onChange={e => onSearchFormPropertyChange(e.target.value, 'title')} />
            </div>
            <div >
                <label htmlFor="classification">分類</label>
                <SingleClassificationSelect
                    defaultSelected={categories}
                    // classRef={classRef}
                    width={'180px'}
                    height={'40px'}
                    setState={onClassificationChange}
                />
            </div>
            <div >
                <label htmlFor="classification">狀態</label>
                <SingleStatusSelect
                    defaultSelected={status}
                    width={'180px'}
                    height={'40px'}
                    setState={onStatusChange}
                />
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
                <input type='button' value='重設' onClick={reset} />
                <input ref={submitRef} type="submit" value="查詢" />
            </div>
        </form>
    </Stack>
}