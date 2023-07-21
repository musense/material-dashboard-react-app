import React, { useEffect, useRef } from 'react'
import DateSelector from 'components/DateSelector/DateSelector';
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import { Box } from '@mui/material';
import * as GetEditorAction from 'actions/GetEditorAction';
import * as GetClassAction from 'actions/GetClassAction';
import { useDispatch } from 'react-redux';
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
    const submitRef = useRef(null);
    const dateRef = useRef(null);

    const classRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        classRef.current = null
        statusRef.current = null
    }, []);
    usePressEnterEventHandler(submitRef);

    function onSearchEditorList(e) {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const searchData = Object.assign(
            {},
            Object.fromEntries(formData),
            classRef.current && { classification: classRef.current.label },
            statusRef.current && { status: statusRef.current.label },
            { createDate: dateRef.current.current() }
        );
        console.log("🚀 ~ file: EditorList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)

        // return
        dispatch({
            type: GetEditorAction.SEARCH_EDITOR_LIST,
            payload: searchData
        })
        return
    }
    function reset() {
        const form = document.getElementsByName('editor-list-form')[0];
        form.reset();
        dispatch({
            type: GetClassAction.RESET_SELECTED_CLASS,
            payload: '--reset-all'
        })
        dateRef.current.reset()
    }

    return <Box
        sx={style}>
        <form name='editor-list-form' className="editor-list-form" onSubmit={onSearchEditorList}>
            <div className="title" >
                <label htmlFor="title">標題</label>
                <input type="text" name='title' />
            </div>
            <div >
                <label htmlFor="classification">分類</label>
                <SingleClassificationSelect
                    classRef={classRef}
                    width={'150px'}
                    height={'40px'}
                />
            </div>
            <div >
                <label htmlFor="classification">狀態</label>
                <SingleStatusSelect
                    statusRef={statusRef}
                    width={'150px'}
                    height={'40px'}
                />
            </div>
            <DateSelector
                width={'250px'}
                ref={dateRef} />
            <div className="button-list">
                <input type='button' value='清空' onClick={reset} />
                <input ref={submitRef} type="submit" value="查詢" />
            </div>
        </form>
    </Box>
}