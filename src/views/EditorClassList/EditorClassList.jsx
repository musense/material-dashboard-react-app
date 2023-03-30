import React, { useEffect, useRef, useState } from 'react'; // useState

// core components
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import * as GetClassAction from '../../actions/GetClassAction';
import CustomModal from '../../components/CustomModal/CustomModal';
// import { Outlet, useNavigate, Link } from 'react-router-dom';
import styles from './EditorClassList.module.css'
import md5 from 'crypto-js/md5'

function EditorClassList() {

    const formRef = useRef(null);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const checkedToDeleteMap = new Map()
    const [isModalOpen, setIsModalOpen] = useState(true);

    const editorClassList = useSelector((state) => state.getEditorClassReducer.editorClassList);
    const editorClass = useSelector((state) => state.getEditorClassReducer.editorClass);

    function keyDownEventHandler(e) {
        const keyName = e.key;
        if (keyName === 'Enter') {
            e.target.submit()
        }
    }
    useEffect(() => {
        if (formRef.current === null) {
            formRef.current = document.getElementsByName('class-form')[0]
            console.log("🚀 ~ file: EditorClassList.jsx:43 ~ useEffect ~ formRef.current:", formRef.current)
            getForm()
            const submitBtn = document.getElementById('class-form-submit');
            submitBtn.addEventListener('keydown', keyDownEventHandler)

        }
        return () => {
            const submitBtn = document.getElementById('class-form-submit');
            submitBtn.removeEventListener('keydown', keyDownEventHandler)
        }

    }, [formRef]);

    function getForm() {
        return formRef.current;
    }

    const setFormData = (editorClass) => {
        const form = getForm();
        if (form === null) return
        form.elements['_id'].value = editorClass._id
        form.elements['classification'].value = editorClass.classification
        form.elements['parent-class'].value = editorClass['parent-class']
        form.elements['title'].value = editorClass.title
        form.elements['description'].value = editorClass.description
        form.elements['keywords'].value = editorClass.keywords
        form.elements['custom-url'].value = editorClass['custom-url']
    }
    setFormData(editorClass)

    function openModal() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }


    function reset() {
        getForm().reset();
    }
    function onSave() {
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        const editedClassData = Object.fromEntries(formData);
        dispatch({
            type: GetClassAction.EDIT_SAVING_CLASS,
            payload: {
                data: {
                    ...editedClassData,
                },
            },
        });

        console.log("🚀 ~ file: EditorClassList.jsx:83 ~ save ~ save:")

        setIsEditing(false)
        form.reset()

    }
    function onAddNewEditor(e) {
        const date = new Date()
        const _id = md5(date.toLocaleTimeString() + Math.random()).toString()
        console.log("🚀 ~ file: EditorClassList.jsx:106 ~ onAddNewEditor ~ _id:", _id)
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        const newClassData = Object.fromEntries(formData);
        dispatch({
            type: GetClassAction.ADD_CLASS,
            payload: {
                data: {
                    ...newClassData,
                    _id
                },
            },
        });

        form.reset()
    }

    function onEdit(editorClass) {
        setIsEditing(true)
        console.log(editorClass);
        // return
        dispatch({
            type: GetClassAction.EDITING_CLASS,
            payload: {
                data: {
                    editorClass,
                },
            },
        });

    }
    function onBunchDelete(e) {
        e.preventDefault()
        const deleteIds = []
        for (const [key, value] of checkedToDeleteMap.entries()) {
            if (!value) continue
            deleteIds.push(key)
        }
        console.log("🚀 ~ file: EditorClassList.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)

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
        checkedToDeleteMap.set(e.target.name, e.target.checked)
        console.log("🚀 ~ file: EditorClassList.jsx:164 ~ checkEditorClassRow ~ checkedToDeleteMap:", checkedToDeleteMap)
    }
    return (
        <div className={styles['editor-container']}>

            <div className={styles['editor-left-wrapper']}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4>新增</h4>
                            </CardHeader>
                            <CardBody>
                                <form name='class-form' onSubmit={onAddNewEditor}>
                                    <input type="hidden" name='_id' />
                                    <label htmlFor="classification">分類名稱</label>
                                    <input type="text" name='classification' />
                                    <label htmlFor="parent-class">上層分類</label>
                                    <input type="text" name='parent-class' />
                                    <label htmlFor="title">title</label>
                                    <input type="text" name='title' />
                                    <label htmlFor="description">description</label>
                                    <input type="text" name='description' />
                                    <label htmlFor="keywords">keywords</label>
                                    <input type="text" name='keywords' />
                                    <label htmlFor="custom-url">自訂網址</label>
                                    <input type="text" name='custom-url' />
                                    <div>
                                        {isEditing && <input type='button' value='儲存' onClick={() => onSave()} />}
                                        {!isEditing && <input type='button' value='清空' onClick={reset} />}
                                        <input id="class-form-submit" type='submit' value='新增' />
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <div className={styles['editor-right-wrapper']}>
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
                                        {
                                            editorClassList && editorClassList.length > 0 && editorClassList.map((editorClass, index) => {
                                                console.log("🚀 ~ file: EditorClassList.jsx:186 ~ editorClassList&&editorClassList.length>0&&editorClassList.map ~ editorClassList:", editorClassList)

                                                return (
                                                    <div data-attr="data-body-row" key={index} onClick={() => onEdit(editorClass)}>
                                                        <div><input type='checkbox' name={editorClass._id} onClick={checkEditorClassRow} /></div>
                                                        <div>{editorClass.classification}</div>
                                                        <div>{editorClass['custom-url']}</div>
                                                        <div>{editorClass['parent-class']}</div>
                                                    </div>)
                                            })
                                        }
                                    </div>

                                </form>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>

        </div >

    );
}

// export default withStyles(styles)(EditorList);
export default EditorClassList;
