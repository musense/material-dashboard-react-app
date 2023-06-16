import React, { useRef } from 'react'
import DateSelector from '../../components/DateSelector/DateSelector';
import { css } from '@emotion/css'
import usePressEnterEventHandler from '../../hook/usePressEnterEventHandler';
import { Box } from '@mui/material';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { useDispatch } from 'react-redux';

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
    return <Box
        sx={{
            width: '100%',
            height: 'fit-content',
            backgroundColor: 'transparent',
            margin: '0 auto 1rem',
            '& h3': {
                textAlign: 'center',
                m: 'unset',
                mb: 2
            },
        }}>
        {/* <h3>搜尋標籤</h3> */}
        <form name='tag-list-form' onSubmit={onSearchEditorList}>

            <div className={css`
                    display: flex;
                    flex-direction: column;
                `}>
                <div className={css`
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                `}>

                    <div className={css`
                        width: 100%;
                        & input {
                            height: 40.8px;
                            border: 1px solid black;
                            border-radius: 4px;
                        }
                    `}>
                        <label htmlFor="title">標籤名稱</label>
                        <input type="text" name='title' />
                    </div>

                    <DateSelector
                        width={'250px'}
                        ref={dateRef} />
                </div>
            </div>
            <div className={css`
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                gap: 2rem;
            `}>
                <input type='button' value='清空' onClick={reset} />
                <input ref={submitRef} type="submit" value="查詢" />
            </div>
        </form>
    </Box>
}
