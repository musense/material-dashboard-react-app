import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'

import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import useEditEditorClassResult from '../../hook/useEditEditorClassResult';

import MessageDialog from '../../components/Modal/MessageDialog';
import useModal from '../../hook/useModal';

export default function EditorLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();
    const id = useSelector((state) => state.getClassReducer.editorClass.id);
    const name = useSelector((state) => state.getClassReducer.editorClass.name);
    const keyName = useSelector((state) => state.getClassReducer.editorClass.keyName);
    const editorClassTitle = useSelector((state) => state.getClassReducer.editorClass.title);
    const description = useSelector((state) => state.getClassReducer.editorClass.description);
    const keywords = useSelector((state) => state.getClassReducer.editorClass.keywords);
    const manualUrl = useSelector((state) => state.getClassReducer.editorClass.manualUrl);
    const customUrl = useSelector((state) => state.getClassReducer.editorClass.customUrl);
    const isEditing = useSelector((state) => state.getClassReducer.editorClass.isEditing);

    const serverMessage = useSelector((state) => state.getClassReducer.errorMessage);
    console.log("🚀 ~ file: EditorLeftWrapper.jsx:24 ~ EditorLeftWrapper ~ returnMessage:", serverMessage)


    console.log("🚀 ~ file: EditorLeftWrapper.jsx:67 ~ EditorLeftWrapper ~ isEditing:", isEditing)



    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useEditEditorClassResult(serverMessage)

    console.log("🚀 ~ file: TagLeftWrapper.jsx:58 ~ TagLeftWrapper ~ title:", title)

    const {
        open,
        handleClose
    } = useModal(title)

    function onAddNewEditor(e) {
        e.preventDefault()

        if (!name || name === '') {
            dispatch({
                type: GetClassAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add title',
                }
            })
            console.log('請輸入 [分類名稱] 選項');
            return
        }

        if (!keyName || keyName === '') {
            dispatch({
                type: GetClassAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add keyname',
                }
            })
            console.log('請輸入 [英文名稱] 選項');
            return
        }

        const tempData = {
            // parentClassification: parentClassRef.current.label,
            classification: name,
            keyName: keyName,
            webHeader: {
                title: editorClassTitle,
                description: description,
                keywords: keywords,
                href: customUrl,
                route: manualUrl,
            },
        }

        console.log("🚀 ~ file: EditorLeftWrapper.jsx:48 ~ onAddNewEditor ~ tempData:", tempData)
        // return
        if (isEditing === true) {
            dispatch({
                type: GetClassAction.EDIT_SAVING_CLASS,
                payload: {
                    ...tempData,
                    _id: id

                },
            });
        } else {
            dispatch({
                type: GetClassAction.ADD_CLASS,
                payload: {
                    tempData
                },
            });
        }
    }

    const onReset = useCallback(() => {
        dispatch({
            type: GetClassAction.CANCEL_EDITING_CLASS
        })
    }, [dispatch])

    const onCancel = useCallback(() => {
        onReset()
    }, [onReset])

    const onPropertyChange = useCallback((value, property) => {
        dispatch({
            type: GetClassAction.SET_CLASS_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])


    return <div className={styles['editor-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>{isEditing ? '編輯' : '新增'}</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form' onSubmit={onAddNewEditor}>
                            <input type="hidden" name='_id' value={id} />
                            <div>
                                <label htmlFor="classification">分類名稱</label>
                                <input disabled={isEditing} type="text" name='classification'
                                    value={name} onChange={e => onPropertyChange(e.target.value, 'name')} />
                            </div>
                            <div>
                                <label htmlFor="keyname">英文名稱</label>
                                <input disabled={isEditing} type="text" name='keyname'
                                    value={keyName} onChange={e => onPropertyChange(e.target.value, 'keyName')} />
                            </div>
                            <div>
                                <label htmlFor="title">title</label>
                                <input type="text" name='title'
                                    value={editorClassTitle} onChange={e => onPropertyChange(e.target.value, 'title')} />
                            </div>
                            <div>
                                <label htmlFor="description">description</label>
                                <input type="text" name='description'
                                    value={description} onChange={e => onPropertyChange(e.target.value, 'description')} />
                            </div>
                            <div>
                                <label htmlFor="keywords">keywords</label>
                                <input type="text" name='keywords'
                                    value={keywords} onChange={e => onPropertyChange(e.target.value, 'keywords')} />
                            </div>
                            <div>
                                <label htmlFor="manualUrl">自訂網址</label>
                                <input type="text" name='manualUrl'
                                    value={manualUrl} onChange={e => onPropertyChange(e.target.value, 'manualUrl')} />
                            </div>
                            {(manualUrl.length > 0 || customUrl) && (
                                <div >
                                    <label htmlFor="customUrl">前台顯示網址</label>
                                    {manualUrl.length > 0
                                        ? <input readOnly disabled type="text" name='manualUrl' value={`p_${manualUrl}.html`} />
                                        : <div><a target="_blank" rel="noopener noreferrer" href={customUrl}>{customUrl}</a></div>
                                    }
                                </div>
                            )}
                            <div className={styles['left-button-container']}>
                                {isEditing === true && (<>
                                    <input type='button' value='取消'
                                        onClick={(e) => onCancel(e)}
                                    />
                                    <input type='submit' value='儲存' title="Enter" />
                                </>)}
                                {isEditing === false && (<>
                                    <input type='button' value='清空'
                                        onClick={(e) => onReset(e)} />
                                    <input type='submit' value='新增' title="Enter" />
                                </>)}
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        <MessageDialog
            dialogTitle={title}
            dialogContent={content}
            success={success}
            open={open}
            setClose={handleClose}
        />
    </div>;
}