import React, { useEffect, useMemo, useRef, useState } from 'react'; // useStatev

import CardBody from 'components/Card/CardBody.jsx';

import { useDispatch, useSelector } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import Button from 'components/CustomButtons/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EditorList.module.css'



export default function EditorListBody(
    // { titleViewList, 
    //     setTitleViewList }
) {

    const navigate = useNavigate();
    const checkedToDeleteMapRef = useRef(new Map())
    const [addEditorDisabled, setAddEditorDisabled] = useState(false);
    const dispatch = useDispatch();

    const [prevBtnDisable, setPrevBtnDisable] = useState(false);
    const [nextBtnDisable, setNextBtnDisable] = useState(false);


    const titleList = useSelector((state) => state.getEditorReducer.titleList);
    console.log("🚀 ~ file: EditorListBody.jsx:28 ~ titleList:", titleList)
    const currentPage = useSelector((state) => state.getEditorReducer.currentPage);
    const totalCount = useSelector((state) => state.getEditorReducer.totalCount);
    // console.log("🚀 ~ file: EditorListBody.jsx:22 ~ titleList:", titleList)

    const [titleViewList, setTitleViewList] = useState([]);

    useEffect(() => {
        if (currentPage === 1)
            setPrevBtnDisable(true)
        else
            setPrevBtnDisable(false)
        if (currentPage * 10 - totalCount >= 0 && currentPage * 10 - totalCount < 10)
            setNextBtnDisable(true)
        else
            setNextBtnDisable(false)
    }, [currentPage, totalCount]);

    useMemo(() => {
        setTitleViewList(titleList)
    }, [titleList]);

    const serialNumberSortingRef = useRef('asc');
    const titleSortingRef = useRef('asc');
    const classificationSortingRef = useRef('asc');
    const createAtSortingRef = useRef('asc');

    const SortingHelperFunc = {
        onSerialNumberClick() {
            const tempViewList = [...titleViewList]
            if (serialNumberSortingRef.current === 'asc') {
                serialNumberSortingRef.current = 'desc'
                setTitleViewList(tempViewList.sort((t1, t2) => parseInt(t2.serialNumber) - parseInt(t1.serialNumber)))
            } else {
                serialNumberSortingRef.current = 'asc'
                setTitleViewList(tempViewList.sort((t1, t2) => parseInt(t1.serialNumber) - parseInt(t2.serialNumber)))
            }
        },
        onTitleClick() {
            const tempViewList = [...titleViewList]
            if (titleSortingRef.current === 'asc') {
                titleSortingRef.current = 'desc'
                setTitleViewList(tempViewList.sort((t1, t2) => t2.content.title.localeCompare(t1.content.title)))
            } else {
                titleSortingRef.current = 'asc'
                setTitleViewList(tempViewList.sort((t1, t2) => t1.content.title.localeCompare(t2.content.title)))
            }
        },
        // onClassificationClick() {
        //     const tempViewList = [...titleViewList]
        //     if (classificationSortingRef.current === 'asc') {
        //         classificationSortingRef.current = 'desc'
        //         setTitleViewList(tempViewList.sort((t1, t2) => t2.classification.localeCompare(t1.classification)))
        //     } else {
        //         classificationSortingRef.current = 'asc'
        //         setTitleViewList(tempViewList.sort((t1, t2) => t1.classification.localeCompare(t2.classification)))
        //     }
        // },
        onCreateAtClick() {
            const tempViewList = [...titleViewList]
            if (createAtSortingRef.current === 'asc') {
                createAtSortingRef.current = 'desc'
                setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t2.createDate)).getTime() - (new Date(t1.createDate)).getTime()))
            } else {
                createAtSortingRef.current = 'asc'
                setTitleViewList(tempViewList.sort((t1, t2) => (new Date(t1.createDate)).getTime() - (new Date(t2.createDate)).getTime()))
            }
        },
    }

    function onEdit(updateEditor) {
        // console.log(updateEditor);
        // return
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                data: {
                    _id: updateEditor._id,
                },
            },
        });
        // return
        navigate(`/admin/editorList/${updateEditor._id}`);
    }
    function onSearchBunchDeleteList(e) {
        e.preventDefault()
        const deleteIds = []
        for (const [key, value] of checkedToDeleteMapRef.current.entries()) {
            if (!value) continue
            deleteIds.push(key)
        }
        console.log("🚀 ~ file: EditorClassList.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)

        dispatch({
            type: GetEditorAction.BUNCH_DELETE_EDITOR,
            payload: deleteIds
        });
        e.target.reset();
    }
    function onAddNewEditor() {
        // initialEditorState()
        navigate('/admin/editorList/new');
    }

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR,
            payload: pageNumber

        })
    }
    function checkEditorClassRow(e) {
        e.stopPropagation();
        checkedToDeleteMapRef.current.set(e.target.name, e.target.checked)
        console.log("🚀 ~ file: EditorClassList.jsx:164 ~ checkEditorClassRow ~ checkedToDeleteMapRef.current:", checkedToDeleteMapRef.current)
    }
    return <CardBody>
        <Button
            color='info'
            disabled={addEditorDisabled}
            onClick={() => onAddNewEditor()}
        >
            新增文章
        </Button>
        <Button
            color='info'
            disabled={prevBtnDisable}
            onClick={() => onPageButtonClick(currentPage - 1)}
        >
            上一頁
        </Button>
        <Button
            color='info'
            disabled={nextBtnDisable}
            onClick={() => onPageButtonClick(currentPage + 1)}
        >
            下一頁
        </Button>
        <form name='view-editor-list-form' onSubmit={onSearchBunchDeleteList}>
            <div data-attr="data-header" className={`${styles['view-form']} ${styles['view-editor-list-header']}`}>
                <div data-attr="data-header-row">
                    <div> <input type='submit' value='批次刪除' /> </div>
                    <div> <input type='button' value='編號' onClick={SortingHelperFunc.onSerialNumberClick} /> </div>
                    <div><input type='button' value='標題' onClick={SortingHelperFunc.onTitleClick} /></div>
                    {/* <div><input type='button' value='分類' onClick={SortingHelperFunc.onClassificationClick} /></div> */}
                    <div>分類</div>
                    <div>圖片/影片</div>
                    <div><input type='button' value='日期' onClick={SortingHelperFunc.onCreateAtClick} /> </div>
                </div>
            </div>
            <div data-attr="data-body" className={`${styles['view-form']} ${styles['view-editor-list-body']}`}>
                {titleViewList && titleViewList.length > 0 && titleViewList.map((titleView, index) => {
                    return (
                        <div data-attr="data-body-row" key={index} onClick={() => onEdit(titleView)}>
                            {/* <div data-attr="data-body-row" key={index} > */}
                            <div><input type='checkbox' name={titleView._id} onClick={checkEditorClassRow} /></div>
                            <div>{parseInt(titleView.serialNumber)}</div>
                            <div>{titleView.content.title}</div>
                            <div className={styles['class-cell']}>
                                {titleView.classifications && titleView.classifications.map((item) =>
                                    <span key={item.value}>{item.label}</span>
                                )}
                            </div>
                            {titleView.media.banner !== '' ? (
                                <div className={styles['view-editor-image-container']}>
                                    <img
                                        src={titleView.media.thumbnail}
                                        title={titleView.media.banner}
                                        alt={titleView.media.altText}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            window.open(titleView.media.banner, '_blank');
                                        }}
                                    />
                                </div>
                            )
                                :
                                (
                                    <>
                                        <div className={styles['view-editor-image-container']}>無圖片/縮圖</div>
                                        {/* <div>無連結</div> */}
                                    </>
                                )}

                            <div>
                                <span className={`${titleView.published ? styles['published'] : styles['not-published-yet']}`}>
                                    {titleView.published ? '已發佈' : '未發佈'}
                                </span>
                                <span>
                                    {`${new Date(titleView.createDate).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })} ${new Date(titleView.createDate).toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: 'numeric' })}`}
                                </span>
                            </div>
                        </div>);
                })}
            </div>
        </form>
    </CardBody>;
}