import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as GetTagsAction from '../../actions/GetTagsAction';
// import md5 from 'crypto-js/md5'
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './TagList.module.css'
import usePressEnterEventHandler from '../../hook/usePressEnterEventHandler';
import useEditTagResult from '../../hook/useEditTagResult';

import useSetTagFormValue from '../../hook/useSetTagFormValue';
import MessageDialog from '../../components/Modal/MessageDialog';

export default function TagLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();
    const selectedTag = useSelector((state) => state.getTagsReducer.selectedTag);
    const returnMessage = useSelector((state) => state.getTagsReducer.errorMessage);
    console.log("🚀 ~ file: TagLeftWrapper.jsx:25 ~ TagLeftWrapper ~ selectedTag:", selectedTag)
    console.log("🚀 ~ file: TagLeftWrapper.jsx:54 ~ useEffect ~ returnMessage:", returnMessage)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        dispatch({
            type: GetTagsAction.SET_ERROR_MESSAGE,
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
    } = useEditTagResult(returnMessage)
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
    } = useSetTagFormValue(selectedTag, formRef)

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));

        if (!formData.get('name')) {
            dispatch({
                type: GetTagsAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add title',
                }
            })
            return
        }

        let tempData = {
            name: formData.get('name'),
            sorting: formData.get('sorting'),
            webHeader: {
                title: formData.get('title'),
                description: formData.get('description'),
                keywords: formData.get('keywords'),
                href: formData.get('customUrl'),
                route: formData.get('manualUrl'),
            },

        }

        if (formData.get('sorting') !== '') {
            console.log(`🚀 ~ file: TagLeftWrapper.jsx:101 ~ onAddNewEditor ~ typeof ${parseInt(formData.get('sorting'))}:`, typeof parseInt(formData.get('sorting')))
            if (typeof parseInt(formData.get('sorting')) !== 'number') {
                dispatch({
                    type: GetTagsAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be typeof number',
                    }
                })
                return
            }
            if (formData.get('sorting') < 0) {
                dispatch({
                    type: GetTagsAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be equal or greater than 0',
                    }
                })
                return
            }
            tempData = {
                ...tempData,
                popular: true,
                sorting: formData.get('sorting')
            }

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
            return
        }
        dispatch({
            type: GetTagsAction.ADD_TAG,
            payload: {
                data: tempData
            },
        });
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
                            {(manualUrl.length > 0 || customUrl) && (
                                <div className={styles['input-group']}>
                                    <label htmlFor="customUrl">前台顯示網址</label>
                                    {manualUrl.length > 0
                                        ? <input readOnly disabled type="text" name='manualUrl' value={`p_${manualUrl}.html`} />
                                        : <div><a target="_blank" rel="noopener noreferrer" href={customUrl}>{customUrl}</a></div>
                                    }
                                </div>
                            )}
                            <div disabled={popularTag} className={styles['input-group']}>
                                <label htmlFor="sorting">熱門標籤排序</label>
                                <input type="number" name='sorting' min={0} />
                            </div>
                            <div className={styles['left-button-container']}>
                                {isEditing
                                    ? (<>
                                        <input type='button' value='取消'
                                            onClick={(e) => onCancel(e)}
                                        />
                                        <input type='submit' value='儲存' title="Enter" />
                                    </>)
                                    : (<>
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
    </div >;
}


