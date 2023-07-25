import React, { useEffect, useRef, useState } from 'react';
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
import useSetEditorClassValue from '../../hook/useSetEditorClassValue';

import MessageDialog from '../../components/Modal/MessageDialog';

export default function EditorLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();
    const editorClass = useSelector((state) => state.getClassReducer.editorClass);
    const returnMessage = useSelector((state) => state.getClassReducer.errorMessage);
    console.log("🚀 ~ file: EditorLeftWrapper.jsx:23 ~ EditorLeftWrapper ~ editorClass:", editorClass)
    console.log("🚀 ~ file: EditorLeftWrapper.jsx:24 ~ EditorLeftWrapper ~ returnMessage:", returnMessage)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        dispatch({
            type: GetClassAction.SET_ERROR_MESSAGE,
            payload: {
                message: '--reset-error-message',
            }
        })
    }

    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useEditEditorClassResult(returnMessage)

    console.log("🚀 ~ file: TagLeftWrapper.jsx:58 ~ TagLeftWrapper ~ title:", title)

    useEffect(() => {
        if (title) handleOpen()
    }, [title, content]);

    const {
        customUrl,
        setCustomUrl,
        manualUrl,
        setManualUrl,
        popularTag,
        setPopularTag,
        isEditing,
        setIsEditing
    } = useSetEditorClassValue(editorClass, formRef)

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        const classData = Object.fromEntries(formData);


        if (!classData.classification || classData.classification === '') {
            dispatch({
                type: GetClassAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add title',
                }
            })
            console.log('請輸入 [分類名稱] 選項');
            return
        }

        if (!classData.keyname || classData.keyname === '') {
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
            classification: classData.classification,
            webHeader: {
                title: classData.title,
                keyname: classData.keyname,
                description: classData.description,
                keywords: classData.keywords,
                href: classData.customUrl,
                route: classData.manualUrl,
            },
        }

        console.log("🚀 ~ file: EditorLeftWrapper.jsx:48 ~ onAddNewEditor ~ tempData:", tempData)
        // return
        if (isEditing === true) {
            dispatch({
                type: GetClassAction.EDIT_SAVING_CLASS,
                payload: {
                    data: {
                        ...tempData,
                        _id: classData._id
                    }
                },
            });
            setIsEditing(false)
        } else {
            dispatch({
                type: GetClassAction.ADD_CLASS,
                payload: {
                    data: tempData
                },
            });
        }
        // onReset(e)
    }

    function getForm() {
        return formRef.current;
    }
    function onReset(e) {
        e && e.preventDefault()
        const form = getForm()
        form.reset()
        setManualUrl('')
        setCustomUrl('')
    }

    function onCancel(e) {
        onReset(e)
        setIsEditing(false)
    }
    return <div className={styles['editor-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>{isEditing ? '編輯' : '新增'}</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form' onSubmit={onAddNewEditor}>
                            <input type="hidden" name='_id' />
                            <div>
                                <label htmlFor="classification">分類名稱</label>
                                <input disabled={isEditing} type="text" name='classification' />
                            </div>
                            <div>
                                <label htmlFor="keyname">英文名稱</label>
                                <input disabled={isEditing} type="text" name='keyname' />
                            </div>
                            <div>
                                <label htmlFor="title">title</label>
                                <input type="text" name='title' />
                            </div>
                            <div>
                                <label htmlFor="description">description</label>
                                <input type="text" name='description' />
                            </div>
                            <div>
                                <label htmlFor="keywords">keywords</label>
                                <input type="text" name='keywords' />
                            </div>
                            <div>
                                <label htmlFor="manualUrl">自訂網址</label>
                                <input type="text" name='manualUrl' onChange={e => setManualUrl(e.target.value)} value={manualUrl} />
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
            open={open}
            setClose={handleClose}
        />
    </div>;
}