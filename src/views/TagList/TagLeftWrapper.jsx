import React, { useMemo, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';
// import md5 from 'crypto-js/md5'
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomRadio from 'components/CustomRadio/CustomRadio';
import styles from './TagList.module.css'
import usePressEnterEventHandler from '../../hook/usePressEnterEventHandler';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function TagLeftWrapper() {

    const [isEditing, setIsEditing] = useState(false);
    const [manualUrl, setManualUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');


    const [modalContext, setModalContext] = useState(undefined);
    const [modalTitle, setModalTitle] = useState(undefined);

    const formRef = useRef(null);
    const isHotRef = useRef(false)
    const dispatch = useDispatch();

    const selectedTag = useSelector((state) => state.getTagsReducer.selectedTag);
    const returnMessage = useSelector((state) => state.getTagsReducer.errorMessage);
    console.log("🚀 ~ file: TagLeftWrapper.jsx:25 ~ TagLeftWrapper ~ returnMessage:", returnMessage)
    console.log("🚀 ~ file: TagLeftWrapper.jsx:25 ~ TagLeftWrapper ~ selectedTag:", selectedTag)

    usePressEnterEventHandler(formRef)

    // useEffect(() => {
    //     if (!returnMessage) return
    //     switch (returnMessage) {
    //         case 'add successfully': {
    //             setModalTitle('Success')
    //             setModalContext('標籤新增成功！')
    //             handleOpen()
    //             console.log('🚀 ~ file: TagLeftWrapper.jsx:69 ~ onAddNewEditor ~ formData: 標籤新增成功！');
    //             return
    //         }
    //         case 'update successfully': {
    //             setModalTitle('Success')
    //             setModalContext('標籤更新成功！')
    //             handleOpen()
    //             console.log('🚀 ~ file: TagLeftWrapper.jsx:69 ~ onAddNewEditor ~ formData: 標籤更新成功！');
    //             return
    //         }

    //         default:
    //             break;
    //     }
    // }, [returnMessage]);
    // console.log("🚀 ~ file: TagLeftWrapper.jsx:54 ~ useEffect ~ returnMessage:", returnMessage)

    // useMemo(() => {
    //     if (selectedTag && selectedTag._id !== '') {
    //         setIsEditing(true)
    //     }
    //     console.log("🚀 ~ file: EditorClassList.jsx:142 ~ setFormData ~ selectedTag:", selectedTag)
    //     const form = getForm();
    //     if (form === null) return
    //     form.reset()
    //     setManualUrl('')
    //     setCustomUrl('')
    //     form.elements['_id'].value = selectedTag._id
    //     form.elements.name.value = selectedTag.name
    //     form.elements.title.value = selectedTag.webHeader.title ? selectedTag.webHeader.title : ''
    //     form.elements.description.value = selectedTag.webHeader.description ? selectedTag.webHeader.description : ''
    //     form.elements.keywords.value = selectedTag.webHeader.keywords ? selectedTag.webHeader.keywords : ''
    //     // form.elements.sorting.value = selectedTag.sorting ? selectedTag.sorting : ''
    //     // form.elements.hotTag.checked = selectedTag.isHot || false
    //     setCustomUrl(selectedTag.webHeader.customUrl)
    // }, [selectedTag])

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));

        if (!formData.get('name')) {
            setModalTitle('Warning')
            setModalContext('請輸入 [標籤名稱]！')
            handleOpen()
            console.log('🚀 ~ file: TagLeftWrapper.jsx:69 ~ onAddNewEditor ~ formData: 請輸入 [標籤名稱]！');
            return
        }

        const tempData = {
            name: formData.get('name'),
            sorting: formData.get('sorting'),
            webHeader: {
                title: formData.get('title'),
                description: formData.get('description'),
                keywords: formData.get('keywords'),
                href: formData.get('customUrl'),
                route: formData.get('manualUrl'),
            },
            isHot: !!formData.get('hotTag')
        }

        console.log("🚀 ~ file: TagLeftWrapper.jsx:48 ~ onAddNewEditor ~ tempData:", tempData)
        // return
        if (isEditing === true) {
            dispatch({
                type: GetTagsAction.EDIT_SAVING_TAG,
                payload: {
                    data: {
                        ...tempData,
                        _id: formData.get('_id')
                    }
                },
            });
            // setIsEditing(false)

        } else {
            dispatch({
                type: GetTagsAction.ADD_TAG,
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
        setManualUrl('')
        setCustomUrl('')
    }

    function onCancel(e) {
        onReset(e)
        setIsEditing(false)
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return <div className={styles['tag-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>{isEditing ? '編輯' : '新增'}</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form' onSubmit={onAddNewEditor}>
                            <div className={styles['input-group']}>
                                <input type="hidden" name='_id' />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="name">標籤名稱</label>
                                <input type="text" name='name' />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="title">title</label>
                                <input type="text" name='title' />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="description">description</label>
                                <input type="text" name='description' />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="keywords">keywords</label>
                                <input type="text" name='keywords' />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="manualUrl">自訂網址</label>
                                <input type="text" name='manualUrl' onChange={e => setManualUrl(e.target.value)} value={manualUrl} />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="customUrl">前台顯示網址</label>
                                {manualUrl && manualUrl.length > 0
                                    ? <input readOnly disabled type="text" name='manualUrl' value={manualUrl} />
                                    : <input readOnly disabled type="text" name='customUrl' value={customUrl} />
                                }
                            </div>
                            {/* <div className={styles['input-group']}>
                                <label htmlFor="sorting">標籤排序</label>
                                <input type="text" name='sorting' />
                            </div> */}
                            {/* <div className={styles['input-group']}>
                                <CustomRadio
                                    label={'熱門標籤'}
                                    name={'hotTag'}
                                />
                            </div> */}
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
        <TagMessageModal
            open={open}
            handleClose={handleClose}
            title={modalTitle}
            context={modalContext}
        />
    </div>;
}

function TagMessageModal({ open, handleClose, title, context }) {
    return <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {context}
            </Typography>
        </Box>
    </Modal>;
}
