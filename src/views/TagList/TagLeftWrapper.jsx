import React, { useRef, useCallback, useEffect, useState } from 'react';
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

import MessageDialog from '../../components/Modal/MessageDialog';
import useModal from '../../hook/useModal';
import CustomRadio from '../../components/CustomRadio/CustomRadio';
import FormButtonList from 'components/FormButtonList/FormButtonList';

export default function TagLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();

    const id = useSelector((state) => state.getTagsReducer.selectedTag.id);
    const tagName = useSelector((state) => state.getTagsReducer.selectedTag.tagName);
    const tagTitle = useSelector((state) => state.getTagsReducer.selectedTag.title);
    const description = useSelector((state) => state.getTagsReducer.selectedTag.description);
    const keywords = useSelector((state) => state.getTagsReducer.selectedTag.keywords);
    const manualUrl = useSelector((state) => state.getTagsReducer.selectedTag.manualUrl);
    const customUrl = useSelector((state) => state.getTagsReducer.selectedTag.customUrl);
    const popular = useSelector((state) => state.getTagsReducer.selectedTag.popular);
    const sorting = useSelector((state) => state.getTagsReducer.selectedTag.sorting);
    const isEditing = useSelector((state) => state.getTagsReducer.selectedTag.isEditing);

    const serverMessage = useSelector((state) => state.getTagsReducer.errorMessage);

    console.log("🚀 ~ file: TagLeftWrapper.jsx:54 ~ useEffect ~ serverMessage:", serverMessage)


    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useEditTagResult(serverMessage)
    console.log("🚀 ~ file: TagLeftWrapper.jsx:58 ~ TagLeftWrapper ~ title:", title)

    const {
        open,
        handleClose
    } = useModal(title)

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));

        if (!tagName) {
            dispatch({
                type: GetTagsAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add tag name',
                }
            })
            return
        }

        let tempData = {
            name: tagName,
            popular: popular,
            webHeader: {
                title: tagTitle,
                description: description,
                keywords: keywords,
                href: customUrl,
                route: manualUrl,
            },

        }

        console.log(`🚀 ~ file: TagLeftWrapper.jsx:101 ~ onAddNewEditor ~ typeof ${parseInt(sorting)}:`, typeof parseInt(sorting))
        if (popular) {
            if (typeof parseInt(sorting) !== 'number') {
                dispatch({
                    type: GetTagsAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be typeof number',
                    }
                })
                return
            }
            if (parseInt(sorting) < 1) {
                dispatch({
                    type: GetTagsAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be equal or greater than 1',
                    }
                })
                return
            }
            tempData = {
                ...tempData,
                sorting: sorting
            }
        }

        console.log("🚀 ~ file: TagLeftWrapper.jsx:48 ~ onAddNewEditor ~ tempData:", tempData)
        // return
        if (isEditing === true) {
            dispatch({
                type: GetTagsAction.EDIT_SAVING_TAG,
                payload: {
                    ...tempData,
                    _id: id
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

    const onReset = useCallback(() => {
        dispatch({
            type: GetTagsAction.CANCEL_EDITING_TAG
        })
    }, [dispatch])

    const onCancel = useCallback(() => {
        onReset()
    }, [onReset])

    const onPropertyChange = useCallback((value, property) => {
        dispatch({
            type: GetTagsAction.SET_TAG_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])

    const onPopularTagChange = useCallback((value) => {
        onPropertyChange(value, 'popular')
    }, [onPropertyChange])

    const handleModalClose = useCallback(() => {
        handleClose()
        onReset()
    }, [onReset, handleClose])
    return <div className={styles['tag-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>{isEditing ? '編輯' : '新增'}</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form' onSubmit={onAddNewEditor}>
                            <div>
                                <input type="hidden" name='_id' value={id} onChange={e => onPropertyChange(e.target.value, 'id')} />
                            </div>
                            <div>
                                <label htmlFor="name">標籤名稱</label>
                                <input type="text" name='name' value={tagName} onChange={e => onPropertyChange(e.target.value, 'tagName')} />
                            </div>
                            <div>
                                <label htmlFor="title">title</label>
                                <input type="text" name='title' value={tagTitle} onChange={e => onPropertyChange(e.target.value, 'title')} />
                            </div>
                            <div>
                                <label htmlFor="description">description</label>
                                <input type="text" name='description' value={description} onChange={e => onPropertyChange(e.target.value, 'description')} />
                            </div>
                            <div>
                                <label htmlFor="keywords">keywords</label>
                                <input type="text" name='keywords' value={keywords} onChange={e => onPropertyChange(e.target.value, 'keywords')} />
                            </div>
                            <div>
                                <label htmlFor="manualUrl">自訂網址</label>
                                <input type="text" name='manualUrl'
                                    value={manualUrl} onChange={e => onPropertyChange(e.target.value, 'manualUrl')} />
                            </div>
                            {manualUrl.length > 0 || customUrl
                                ? <div>
                                    <label htmlFor="customUrl">前台顯示網址</label>
                                    {manualUrl.length > 0
                                        ? <input readOnly disabled type="text" name='manualUrl' value={`p_${manualUrl}.html`} />
                                        : <div><a target="_blank" rel="noopener noreferrer" href={customUrl}>{customUrl}</a></div>
                                    }
                                </div>
                                : null
                            }
                            <div>
                                <CustomRadio
                                    value={popular}
                                    label={'是否設為熱門標籤'}
                                    setState={onPopularTagChange} />
                            </div>
                            {popular && <div>
                                <label htmlFor="sorting">熱門標籤排序</label>
                                <input type="number" name='sorting' min={1}
                                    value={sorting} onChange={e => onPropertyChange(e.target.value, 'sorting')} />
                            </div>}
                            <FormButtonList
                                isEditing={isEditing}
                                onCancel={onCancel}
                                onReset={onReset}
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
    </div >;
}



