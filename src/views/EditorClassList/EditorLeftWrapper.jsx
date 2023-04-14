import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from '../../actions/GetClassAction';
// import md5 from 'crypto-js/md5'
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css'

import SingleParentCatSelectSort from "./../../components/MultiSelectSort/SingleParentCatSelectSort";
import SingleClassificationSelectSort from "./../../components/MultiSelectSort/SingleClassificationSelectSort";

export default function EditorLeftWrapper() {

    const [selectedParentClass, setSelectedParentClass] = useState([]);
    const [selectedClass, setSelectedClass] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const formRef = useRef(null);

    const dispatch = useDispatch();


    const editorClass = useSelector((state) => state.getClassReducer.editorClass);
    console.log("🚀 ~ file: EditorLeftWrapper.jsx:25 ~ EditorLeftWrapper ~ editorClass:", editorClass)
    const parentClassOptions = useSelector((state) => state.getClassReducer.parentClassOptions);


    useEffect(() => {
        if (formRef.current === null) {
            formRef.current.addEventListener('keydown', keyDownEventHandler);
            return
        } else {
        }

        return () => {
            formRef.current.removeEventListener('keydown', keyDownEventHandler);
        }
    }, [formRef])

    useEffect(() => {
        // console.log("🚀 ~ file: EditorLeftWrapper.jsx:38 ~ EditorLeftWrapper ~ selectedParentClass.label:", selectedParentClass.label)
        dispatch({
            type: GetClassAction.REQUEST_CLASS,
            payload: selectedParentClass.label
        })
        // setSelectedClass([])
    }, [selectedParentClass.label])

    useEffect(() => {
        if (!editorClass.parentClass) return
        if (!editorClass._id) return
        if (!editorClass.classification) return
        const label = editorClass.parentClass
        const parentOption = parentClassOptions.find(options => {
            return options.label === label
        })
        const option = {
            value: editorClass._id,
            label: editorClass.classification
        }
        setSelectedParentClass(parentOption)
        dispatch({
            type: GetClassAction.REQUEST_CLASS,
            payload: label
        })
        setSelectedClass(option)

    }, [editorClass.parentClass, editorClass._id, editorClass.classification])

    useMemo(() => {
        if (editorClass._id !== '') {
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

    function keyDownEventHandler(e) {
        e.preventDefault()
        const keyName = e.key;
        if (keyName === 'Enter') {
            console.log("🚀 ~ file: EditorLeftWrapper.jsx:26 ~ keyDownEventHandler ~ keyName:", keyName)
            onAddNewEditor(e)
        }
    }
    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        const classData = Object.fromEntries(formData);
        // console.log("🚀 ~ file: EditorClassList.jsx:167 ~ onAddNewEditor ~ classData:", classData)
        let tempData = Object.assign(
            {},
            {
                parentClassification: selectedParentClass.label,
                classification: selectedClass,
                webHeader: {
                    title: classData.title,
                    description: classData.description,
                    keywords: classData.keywords,
                    href: classData.customUrl,
                },
            }
        )
        console.log("🚀 ~ file: EditorLeftWrapper.jsx:48 ~ onAddNewEditor ~ tempData:", tempData)
        if (isEditing === true) {
            tempData = Object.assign(tempData, { _id: classData._id })
            dispatch({
                type: GetClassAction.EDIT_SAVING_CLASS,
                payload: {
                    data: tempData
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

        setSelectedParentClass([])
        setSelectedClass([])
    }

    function onCancel(e) {
        onReset(e)
        // setTimeout(() => {
        setIsEditing(false)
        // }, 0)
    }
    return <div className={styles['editor-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>新增</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form' onSubmit={onAddNewEditor}>
                            <input type="hidden" name='_id' />
                            <label htmlFor="classification">分類名稱</label>
                            {/* <input type="text" name='classification' /> */}
                            <SingleClassificationSelectSort
                                setSelectedItems={setSelectedClass}
                                selectedItems={selectedClass}
                            />
                            <label htmlFor="parentClass">上層分類</label>
                            <SingleParentCatSelectSort
                                setSelectedItems={setSelectedParentClass}
                                selectedItems={selectedParentClass}
                            />
                            {/* <input type="text" name='parentClass' /> */}
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