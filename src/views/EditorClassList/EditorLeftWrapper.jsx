import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from '../../actions/GetClassAction';
// import md5 from 'crypto-js/md5'
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'

// import SingleParentCatSelect from "../../components/Select/Single/SingleParentCatSelect";
import SingleClassificationSelect from "../../components/Select/Single/SingleClassificationSelect";

import usePressEnterEventHandler from '../../hook/usePressEnterEventHandler';

// const MemorizedParentSelector = React.memo(SingleParentCatSelect)
// const MemorizedClassSelector = React.memo(SingleClassificationSelect)



export default function EditorLeftWrapper() {

    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef(null);

    const dispatch = useDispatch();

    const parentClassRef = useRef();
    const classRef = useRef();

    const editorClass = useSelector((state) => state.getClassReducer.editorClass);
    console.log("🚀 ~ file: EditorLeftWrapper.jsx:25 ~ EditorLeftWrapper ~ editorClass:", editorClass)


    usePressEnterEventHandler(formRef)

    useMemo(() => {
        if (editorClass && editorClass._id !== '') {
            setIsEditing(true)
        }
        console.log("🚀 ~ file: EditorClassList.jsx:142 ~ setFormData ~ editorClass:", editorClass)
        const form = getForm();
        if (form === null) return
        form.elements['_id'].value = editorClass._id

        form.elements['title'].value = editorClass.title
        form.elements['description'].value = editorClass.description
        form.elements['keywords'].value = editorClass.keywords
        form.elements.customUrl.value = editorClass.customUrl
    }, [editorClass])

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        const classData = Object.fromEntries(formData);

        console.log("🚀 ~ file: EditorLeftWrapper.jsx:77 ~ onAddNewEditor ~ parentClassRef.current:", parentClassRef.current)
        console.log("🚀 ~ file: EditorLeftWrapper.jsx:77 ~ onAddNewEditor ~ classRef.current:", classRef.current)
        // if (!parentClassRef.current) {
        //     console.log('請輸入 [上層分類] 選項');
        //     return
        // }

        if (!classRef.current) {
            console.log('請輸入 [分類名稱] 選項');
            return
        }
        const tempData = {
            // parentClassification: parentClassRef.current.label,
            classification: classRef.current.label,
            webHeader: {
                title: classData.title,
                description: classData.description,
                keywords: classData.keywords,
                href: classData.customUrl,
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
        e.preventDefault()
        const form = getForm()
        form.reset()
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
                            <SingleClassificationSelect
                                creatable
                                classRef={classRef}
                            />
                            {/* <label htmlFor="parentClass">上層分類</label> */}
                            {/* <MemorizedParentSelector parentClassRef={parentClassRef} /> */}
                            {/* <SingleParentCatSelect parentClassRef={parentClassRef} /> */}
                            <label htmlFor="title">title</label>
                            <input type="text" name='title' />
                            <label htmlFor="description">description</label>
                            <input type="text" name='description' />
                            <label htmlFor="keywords">keywords</label>
                            <input type="text" name='keywords' />
                            <label htmlFor="customUrl">自訂網址</label>
                            <input type="text" name='customUrl' />
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