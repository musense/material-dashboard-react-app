import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';
// import md5 from 'crypto-js/md5'
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'

// import SingleClassificationSelect from "components/Select/Single/SingleClassificationSelect";

import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';


export default function EditorLeftWrapper() {

    const [isEditing, setIsEditing] = useState(false);
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const formRef = useRef(null);

    const dispatch = useDispatch();

    const parentClassRef = useRef();
    // const classRef = useRef(null);

    const editorClass = useSelector((state) => state.getClassReducer.editorClass);
    console.log("🚀 ~ file: EditorLeftWrapper.jsx:25 ~ EditorLeftWrapper ~ editorClass:", editorClass)

    // useEffect(() => {
    //     classRef.current = null
    // }, []);
    usePressEnterEventHandler(formRef)

    useEffect(() => {
        if (!editorClass) return
        if (editorClass._id !== '') {
            setIsEditing(true)
        }
        console.log("🚀 ~ file: EditorClassList.jsx:142 ~ setFormData ~ editorClass:", editorClass)
        const form = getForm();
        if (form === null) return
        form.reset()
        setManualUrl('')
        setCustomUrl('')
        form.elements['_id'].value = editorClass._id
        form.elements['classification'].value = editorClass.name
        form.elements['title'].value = editorClass.title
        form.elements['description'].value = editorClass.description
        form.elements['keywords'].value = editorClass.keywords
        setManualUrl(editorClass.manualUrl)
        setCustomUrl(editorClass.customUrl)
    }, [editorClass])

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        const classData = Object.fromEntries(formData);

        console.log("🚀 ~ file: EditorLeftWrapper.jsx:77 ~ onAddNewEditor ~ parentClassRef.current:", parentClassRef.current)
        // console.log("🚀 ~ file: EditorLeftWrapper.jsx:77 ~ onAddNewEditor ~ classRef.current:", classRef.current)
        // if (!parentClassRef.current) {
        //     console.log('請輸入 [上層分類] 選項');
        //     return
        // }
        if (!classData.classification || classData.classification === '') {
            console.log('請輸入 [分類名稱] 選項');
            return
        }
        // if (!classRef.current) {
        //     console.log('請輸入 [分類名稱] 選項');
        //     return
        // }
        const tempData = {
            // parentClassification: parentClassRef.current.label,
            classification: classData.classification,
            webHeader: {
                title: classData.title,
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
        dispatch({
            type: GetClassAction.RESET_SELECTED_CLASS,
            payload: '--reset-all'
        })
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
                            <label htmlFor="classification">分類名稱</label>
                            {/* <SingleClassificationSelect creatable classRef={classRef} /> */}
                            <input type="text" name='classification' />
                            <label htmlFor="title">title</label>
                            <input type="text" name='title' />
                            <label htmlFor="description">description</label>
                            <input type="text" name='description' />
                            <label htmlFor="keywords">keywords</label>
                            <input type="text" name='keywords' />
                            <label htmlFor="manualUrl">自訂網址</label>
                            <input type="text" name='manualUrl' onChange={e => setManualUrl(e.target.value)} value={manualUrl} />
                            <label htmlFor="customUrl">前台顯示網址</label>
                            {/* {manualUrl && manualUrl.length > 0 */}
                            {/* ? <input readOnly disabled type="text" name='manualUrl' value={manualUrl} /> */}
                            {/* :  */}
                            <input readOnly disabled type="text" name='customUrl' value={customUrl} />
                            {/* } */}

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
    </div>;
}