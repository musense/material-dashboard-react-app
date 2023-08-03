import React, { useEffect, useRef } from 'react'
import DateSelector from 'components/DateSelector/DateSelector';
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import { Box } from '@mui/material';
import * as GetEditorAction from 'actions/GetEditorAction';
import * as GetSlateAction from 'actions/GetSlateAction';
import { useDispatch, useSelector } from 'react-redux';
import SingleClassificationSelect from 'components/Select/SingleClassificationSelect';
import SingleStatusSelect from 'components/Select/SingleStatusSelect';
import { useCallback } from 'react';

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
    const title = useSelector((state) => state.getSlateReducer.searchForm.title);
    const categories = useSelector((state) => state.getSlateReducer.searchForm.categories);
    const status = useSelector((state) => state.getSlateReducer.searchForm.status);
    const startDate = useSelector((state) => state.getSlateReducer.searchForm.createDate.startDate);
    const endDate = useSelector((state) => state.getSlateReducer.searchForm.createDate.endDate);

    const submitRef = useRef(null);

    usePressEnterEventHandler(submitRef);

    const onSearchFormPropertyChange = useCallback((value, property, detail = null) => {
        dispatch({
            type: GetSlateAction.SET_SEARCH_FORM_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    detail: detail,
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
        onSearchFormPropertyChange(value, 'createDate', 'startDate')
    }, [onSearchFormPropertyChange])

    const onEndDateChange = useCallback((value) => {
        onSearchFormPropertyChange(value, 'createDate', 'endDate')
    }, [onSearchFormPropertyChange])

    function onSearchEditorList(e) {
        e.preventDefault()
        const searchData = {
            title,
            categories,
            status,
            createDate: {
                startDate,
                endDate
            }
        }
        console.log("🚀 ~ file: EditorList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)

        return
        dispatch({
            type: GetEditorAction.SEARCH_EDITOR_LIST,
            payload: searchData
        })
        return
    }
    
    const reset = useCallback(() => {
        dispatch({
            type: GetSlateAction.RESET_SEARCH_FORM
        })
    }, [dispatch])

    return <Box sx={style}>
        <form name='editor-list-form' className="editor-list-form" onSubmit={onSearchEditorList}>
            <div className="title" >
                <label htmlFor="title">標題</label>
                <input type="text" name='title' value={title} onChange={e => onSearchFormPropertyChange(e.target.value, 'title')} />
            </div>
            <div >
                <label htmlFor="classification">分類</label>
                <SingleClassificationSelect
                    defaultSelected={categories}
                    // classRef={classRef}
                    width={'150px'}
                    height={'40px'}
                    setState={onClassificationChange}
                />
            </div>
            <div >
                <label htmlFor="classification">狀態</label>
                <SingleStatusSelect
                    defaultSelected={status}
                    width={'150px'}
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
                <input type='button' value='清空' onClick={reset} />
                <input ref={submitRef} type="submit" value="查詢" />
            </div>
        </form>
    </Box>
}