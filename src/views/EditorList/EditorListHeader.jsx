import React, { useRef, useState, useEffect } from 'react'; // useState
import CardHeader from 'components/Card/CardHeader.jsx';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as locales from 'react-date-range/dist/locale';
import { DateRange } from 'react-date-range';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useDispatch, useSelector } from 'react-redux';

import styles from './EditorList.module.css'
import SingleClassificationSelectSort from '../../components/MultiSelectSort/SingleClassificationSelectSort';

export default function EditorListHeader({ titleList, setTitleViewList }) {

    const dispatch = useDispatch();
    const submitRef = useRef(null);
    const dateRef = useRef(null);
    const [selectedItems, setSelectedItems] = useState([]);
    function keyDownEventHandler(e) {
        const keyName = e.key;
        if (keyName === 'Enter') {
            e.target.submit()
        }
    }

    useEffect(() => {
        if (submitRef.current === null) {
            submitRef.current.addEventListener('keydown', keyDownEventHandler)
        } else {
        }
        return () => {
            submitRef.current.removeEventListener('keydown', keyDownEventHandler)
        }
    }, [submitRef]);

    const [dateRangeState, setDateRangeState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);


    function onSearchEditorList(e) {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        const searchData = Object.assign(
            {},
            Object.fromEntries(formData),
            { classification: selectedItems },
            { createDate: dateRef.current }
        );
        console.log("🚀 ~ file: EditorList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)


        dispatch({
            type: GetEditorAction.SEARCH_EDITOR_LIST,
            payload: searchData
        })
        return
        let tempViewList = [...titleList]

        if (searchData.title) {
            tempViewList = tempViewList
                .filter(titleView => titleView.title.toLowerCase().includes(searchData.title.toLowerCase()))
        }
        if (searchData.classification) {
            tempViewList = tempViewList
                .filter(titleView => titleView.classification.toLowerCase().includes(searchData.classification.toLowerCase()))
        }
        if (searchData.createDate) {
            searchData.createDate.startDate && (
                tempViewList = tempViewList
                    .filter(titleView =>
                        (new Date(searchData.createDate.startDate)).getTime() <= (new Date(titleView.createAt)).getTime())
            )
            searchData.createDate.endDate && (
                tempViewList = tempViewList
                    .filter(titleView =>
                        (new Date(searchData.createDate.endDate)).getTime() >= (new Date(titleView.createAt)).getTime())
            )
        }
        setTitleViewList(tempViewList)
    }
    function handleDateSelect(item) {
        dateRef.current = {
            startDate: `${item.selection.startDate.toLocaleDateString()} 00:00:00`,
            endDate: `${item.selection.endDate.toLocaleDateString()} 23:59:59`
        }
        setDateRangeState([item.selection])
    }
    function reset() {
        // name='editor-list-form' 
        const form = document.getElementsByName('editor-list-form')[0];
        form.reset();
        dateRef.current = {
            startDate: null,
            endDate: null
        }
        setDateRangeState([{
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }])
    }


    return <CardHeader color='primary'>
        <h4>文章列表</h4>
        <form name='editor-list-form' onSubmit={onSearchEditorList}>
            <div>
                <label htmlFor="title">標題</label>
                <input type="text" name='title' />
            </div>
            <div>

                <label htmlFor="classification">分類</label>
                {/* <input type="text" name='classification' /> */}
                <SingleClassificationSelectSort
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                />
            </div>
            <div>

                <label htmlFor="dateRange">日期</label>
                <DateRange
                    className={styles['date-range-selector']}
                    name="dateRange"
                    // editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRangeState}
                    onChange={handleDateSelect}
                    locale={locales['zhTW']} />
            </div>
            <div>
                <input ref={submitRef} type="submit" value="查詢" />
                <input type='button' value='清空' onClick={reset} />
            </div>
        </form>

    </CardHeader>;
}
