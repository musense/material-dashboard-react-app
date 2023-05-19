import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';

import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'
import Button from 'components/CustomButtons/Button';

export default function EditorRightWrapper({ isLoading = true }) {

    const [prevBtnDisable, setPrevBtnDisable] = useState(false);
    const [nextBtnDisable, setNextBtnDisable] = useState(false);

    const dispatch = useDispatch();
    const checkedToDeleteMapRef = useRef(new Map())
    const showList = useSelector((state) => state.getClassReducer.showList);
    const currentPage = useSelector((state) => state.getClassReducer.currentPage);
    const totalCount = useSelector((state) => state.getClassReducer.totalCount);

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

    function onBunchDelete(e) {
        e.preventDefault()
        const deleteIds = []
        for (const [key, value] of checkedToDeleteMapRef.current.entries()) {
            if (!value) continue
            deleteIds.push(key)
        }
        console.log("🚀 ~ file: EditorClassList.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)
        // return
        console.log("🚀 ~ file: EditorClassList.jsx:43 ~ onBunchDelete ~ checkedToDeleteMapRef.current:", checkedToDeleteMapRef.current)
        dispatch({
            type: GetClassAction.BUNCH_DELETE_CLASS,
            payload: deleteIds

        });
        checkedToDeleteMapRef.current.clear()
        e.target.reset();
    }

    function checkEditorClassRow(e) {
        e.stopPropagation();
        checkedToDeleteMapRef.current.set(e.target.name, e.target.checked)
        console.log("🚀 ~ file: EditorClassList.jsx:164 ~ checkEditorClassRow ~ checkedToDeleteMapRef.current:", checkedToDeleteMapRef.current)
    }

    function onEdit(editorClass) {
        dispatch({
            type: GetClassAction.EDITING_CLASS,
            payload: {
                editorClass: editorClass,

            },
        });
    }
    const onSortingClick = (key) => {
        dispatch({
            type: GetClassAction.SHOW_CLASS_LIST_SORTING,
            payload: {
                key: key
            }
        })
    }
    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetClassAction.REQUEST_CLASS_PAGE,
            payload: pageNumber

        })
    }
    return <div className={styles['editor-right-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

                <Card>
                    <CardHeader color="primary">
                        <h4>分類排列</h4>
                    </CardHeader>
                    <CardBody>
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
                        <form name='view-class-form' className={styles['editor-table-wrapper']} onSubmit={onBunchDelete}>
                            <div data-attr="data-header" className={`${styles['view-form']} ${styles['editor-table-header']}`}>
                                <div data-attr="data-header-row">
                                    <div> <input type='submit' value='批次刪除' /> </div>
                                    <div><input type='button' value='分類名稱' onClick={() => onSortingClick('name')} /></div>
                                    <div><input type='button' value='分類網址' onClick={() => onSortingClick('customUrl')} /></div>
                                    {/* <div><input type='button' value='分類上層' onClick={() => onSortingClick('parentClass')} /></div> */}
                                </div>
                            </div>
                            <div data-attr="data-body" className={`${styles['view-form']} ${styles['editor-table-body']}`}>
                                {showList && showList.length > 0 && showList.map((editorClass, index) => {
                                    return (
                                        <div data-attr="data-body-row" key={index} onClick={() => onEdit(editorClass)}>
                                            <div><input type='checkbox' name={editorClass._id} onClick={checkEditorClassRow} /></div>
                                            <div>{editorClass.name}</div>
                                            <div>{editorClass.customUrl}</div>
                                            {/* <div>{editorClass.parentClass}</div> */}
                                        </div>);
                                })}
                            </div>

                        </form>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    </div>;
}