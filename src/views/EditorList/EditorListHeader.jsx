import React, { useEffect, useRef, useState } from 'react'; // useState
import CardHeader from 'components/Card/CardHeader.jsx';

import * as GetEditorAction from 'actions/GetEditorAction';
import { useDispatch } from 'react-redux';

import SingleClassificationSelect from 'components/Select/Single/SingleClassificationSelect';
import DateSelector from 'components/DateSelector/DateSelector';
import { css } from '@emotion/css'
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';

export default function EditorListHeader({ titleList, setTitleViewList }) {

    const dispatch = useDispatch();
    const submitRef = useRef(null);
    const dateRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const classRef = useRef(null);

    useEffect(() => {
        classRef.current = null
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
        dateRef.current.reset()
    }


    return <CardHeader color='primary'>
        <h4>文章列表</h4>
        <form name='editor-list-form' onSubmit={onSearchEditorList}>
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
                        width: 50%;
                    `}>
                        <label htmlFor="title">標題</label>
                        <input type="text" name='title' />
                    </div>
                    <div className={css`
                        width: 50%;
                    `}>
                        <label htmlFor="classification">分類</label>
                        {/* <input type="text" name='classification' /> */}
                        <SingleClassificationSelect
                            classRef={classRef}
                        />
                    </div>
                    <DateSelector ref={dateRef} />
                </div>
            </div>
            <div className={css`
                display: flex;
                flex-direction: row;
                gap: 1rem;
            `}>
                <input ref={submitRef} type="submit" value="查詢" />
                <input type='button' value='清空' onClick={reset} />
            </div>
        </form>

    </CardHeader>;
}
