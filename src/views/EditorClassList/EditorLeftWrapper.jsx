import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';
import * as GetDialogAction from 'actions/GetDialogAction';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'

import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import useModalResult from '../../hook/useModalResult';

import MessageDialog from '../../components/Modal/MessageDialog';
import useModal from '../../hook/useModal';
import FormButtonList from 'components/FormButtonList/FormButtonList';
import getErrorMessage from 'utils/getErrorMessage';
import useClearForm from 'hook/useClearForm';

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
    const isEditing = useSelector((state) => state.getClassReducer.isEditing);

    const serverMessage = useSelector((state) => state.getClassReducer.errorMessage);
    const clientErrorMessage = useSelector((state) => state.getDialogReducer.clientErrorMessage);
    const message = getErrorMessage(clientErrorMessage, serverMessage)

    useClearForm(onReset)
    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useModalResult({
        message,
        name: '分類'
    })

    const {
        open,
        handleClose
    } = useModal(title)

    function onAddNewEditor(e) {
        e.preventDefault()

        if (!name || name === '') {
            dispatch({
                type: GetDialogAction.SET_CLIENT_MESSAGE,
                payload: {
                    clientErrorMessage: 'please add title',
                }
            })
            console.log('請輸入 [分類名稱] 選項');
            return
        }

        if (!keyName || keyName === '') {
            dispatch({
                type: GetDialogAction.SET_CLIENT_MESSAGE,
                payload: {
                    clientErrorMessage: 'please add keyname',
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

    const onPropertyChange = (value, property) => {
        dispatch({
            type: GetClassAction.SET_CLASS_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value
                }
            }
        })
    }

    const handleModalClose = useCallback(() => {
        handleClose()
        onReset()
    }, [onReset, handleClose])

    return <div className={styles['editor-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>{isEditing ? '編輯' : '新增'}</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form'>
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
                            <FormButtonList
                                isEditing={isEditing}
                                onReset={onReset}
                                callback={onAddNewEditor}
                            />
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
            setClose={handleModalClose}
        />
    </div>;
}