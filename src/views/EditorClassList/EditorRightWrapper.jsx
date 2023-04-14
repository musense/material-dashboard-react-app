import React, { useEffect, useMemo, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from '../../actions/GetClassAction';

import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'

export default function EditorRightWrapper({ isLoading = true }) {

    const dispatch = useDispatch();
    const checkedToDeleteMapRef = useRef(new Map())
    // dispatch({
    //     type: GetClassAction.REQUEST_CLASS_LIST
    // })


    const editorClassList = useSelector((state) => state.getClassReducer.editorClassList);

    useMemo(() => {

        console.log("🚀 ~ file: EditorRightWrapper.jsx:32 ~ EditorRightWrapper ~ editorClassList:", editorClassList)
    }, [editorClassList])
    function onBunchDelete(e) {
        e.preventDefault()
        const deleteIds = []
        for (const [key, value] of checkedToDeleteMapRef.current.entries()) {
            if (!value) continue
            deleteIds.push(key)
        }
        // console.log("🚀 ~ file: EditorClassList.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)
        return
        // Dino not implemented api yet            
        dispatch({
            type: GetClassAction.BUNCH_DELETE_CLASS,
            payload: {
                data:
                    deleteIds
            },
        });
        e.target.reset();
    }

    function checkEditorClassRow(e) {
        e.stopPropagation();
        checkedToDeleteMapRef.current.set(e.target.name, e.target.checked)
        // console.log("🚀 ~ file: EditorClassList.jsx:164 ~ checkEditorClassRow ~ checkedToDeleteMapRef.current:", checkedToDeleteMapRef.current)
    }

    function onEdit(editorClass) {

        // console.log(editorClass);
        // return
        dispatch({
            type: GetClassAction.EDITING_CLASS,
            payload: {
                data: editorClass,

            },
        });

    }

    return <div className={styles['editor-right-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

                <Card>
                    <CardHeader color="primary">
                        <h4>分類排列</h4>
                    </CardHeader>
                    <CardBody>
                        <form name='view-class-form' className={styles['editor-table-wrapper']} onSubmit={onBunchDelete}>
                            <div data-attr="data-header" className={`${styles['view-form']} ${styles['editor-table-header']}`}>
                                <div data-attr="data-header-row">
                                    <div> <input type='submit' value='批次刪除' /> </div>
                                    <div>分類名稱</div>
                                    <div>分類網址</div>
                                    <div>分類上層</div>
                                </div>
                            </div>
                            <div data-attr="data-body" className={`${styles['view-form']} ${styles['editor-table-body']}`}>
                                {editorClassList && editorClassList.length > 0 && editorClassList.map((editorClass, index) => {
                                    // console.log("🚀 ~ file: EditorClassList.jsx:186 ~ editorClassList&&editorClassList.length>0&&editorClassList.map ~ editorClassList:", editorClassList);

                                    return (
                                        <div data-attr="data-body-row" key={index} onClick={() => onEdit(editorClass)}>
                                            <div><input type='checkbox' name={editorClass._id} onClick={checkEditorClassRow} /></div>
                                            <div>{editorClass.classification}</div>
                                            <div>{editorClass.customUrl}</div>
                                            <div>{editorClass.parentClass}</div>
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