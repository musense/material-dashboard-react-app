import React, { useRef } from 'react'
import DateSelector from '../../components/DateSelector/DateSelector';
import { css } from '@emotion/css'
import usePressEnterEventHandler from '../../hook/usePressEnterEventHandler';
import { Box } from '@mui/material';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { useDispatch } from 'react-redux';

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
    const submitRef = useRef(null);
    const dateRef = useRef(null);

    usePressEnterEventHandler(submitRef)

    function onSearchEditorList(e) {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const searchData = Object.assign(
            {},
            Object.fromEntries(formData),
            { createDate: dateRef.current.current() }
        );
        console.log("🚀 ~ file: EditorList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)

        // return
        dispatch({
            type: GetTagsAction.SEARCH_TAG_LIST,
            payload: searchData
        })
        return
    }

    function reset() {
        const form = document.getElementsByName('tag-list-form')[0];
        form.reset();
        dateRef.current.reset()
    }
    return <Box sx={style}>
        <form name='tag-list-form' className="tag-list-form" onSubmit={onSearchEditorList}>

            <div className="title" >
                <label htmlFor="title">標籤名稱</label>
                <input type="text" name='title' />
            </div>

            <DateSelector
                width={'160px'}
                height={'40px'}
                ref={dateRef} />
            <div className="button-list">
                <input type='button' value='清空' onClick={reset} />
                <input ref={submitRef} type="submit" value="查詢" />
            </div>
        </form>
    </Box>
}
