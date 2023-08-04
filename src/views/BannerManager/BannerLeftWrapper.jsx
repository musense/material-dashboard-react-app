import React, { useRef, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as GetBannerAction from '../../actions/GetBannerAction';
// import md5 from 'crypto-js/md5'
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './BannerList.module.css'
import usePressEnterEventHandler from '../../hook/usePressEnterEventHandler';
import useBannerResult from '../../hook/useBannerResult';

import useSetBannerFormValue from '../../hook/useSetBannerFormValue';
import MessageDialog from '../../components/Modal/MessageDialog';
import useModal from '../../hook/useModal';
import CustomRadio from '../../components/CustomRadio/CustomRadio';

export default function BannerLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();

    const id = useSelector((state) => state.getBannerReducer.selectedBanner.id);
    const BannerName = useSelector((state) => state.getBannerReducer.selectedBanner.BannerName);
    const BannerTitle = useSelector((state) => state.getBannerReducer.selectedBanner.title);
    const description = useSelector((state) => state.getBannerReducer.selectedBanner.description);
    const keywords = useSelector((state) => state.getBannerReducer.selectedBanner.keywords);
    const manualUrl = useSelector((state) => state.getBannerReducer.selectedBanner.manualUrl);
    const customUrl = useSelector((state) => state.getBannerReducer.selectedBanner.customUrl);
    const popular = useSelector((state) => state.getBannerReducer.selectedBanner.popular);
    const sorting = useSelector((state) => state.getBannerReducer.selectedBanner.sorting);
    const isEditing = useSelector((state) => state.getBannerReducer.selectedBanner.isEditing);

    const serverMessage = useSelector((state) => state.getBannerReducer.errorMessage);

    console.log("🚀 ~ file: BannerLeftWrapper.jsx:54 ~ useEffect ~ serverMessage:", serverMessage)


    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useBannerResult(serverMessage)
    console.log("🚀 ~ file: BannerLeftWrapper.jsx:58 ~ BannerLeftWrapper ~ title:", title)

    const {
        open,
        handleClose
    } = useModal(title)

    function onAddNewEditor(e) {
        e.preventDefault()
        const form = getForm();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));

        if (!BannerName) {
            dispatch({
                type: GetBannerAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add Banner name',
                }
            })
            return
        }

        let tempData = {
            name: BannerName,
            popular: popular,
            webHeader: {
                title: BannerTitle,
                description: description,
                keywords: keywords,
                href: customUrl,
                route: manualUrl,
            },

        }

        console.log(`🚀 ~ file: BannerLeftWrapper.jsx:101 ~ onAddNewEditor ~ typeof ${parseInt(sorting)}:`, typeof parseInt(sorting))
        if (popular) {
            if (typeof parseInt(sorting) !== 'number') {
                dispatch({
                    type: GetBannerAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be typeof number',
                    }
                })
                return
            }
            if (parseInt(sorting) < 1) {
                dispatch({
                    type: GetBannerAction.SET_ERROR_MESSAGE,
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

        console.log("🚀 ~ file: BannerLeftWrapper.jsx:48 ~ onAddNewEditor ~ tempData:", tempData)
        // return
        if (isEditing === true) {
            dispatch({
                type: GetBannerAction.EDIT_SAVING_BANNER,
                payload: {
                    ...tempData,
                    _id: id
                },
            });
            return
        }
        dispatch({
            type: GetBannerAction.ADD_BANNER,
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
            type: GetBannerAction.CANCEL_EDITING_BANNER
        })
    }, [dispatch])

    const onCancel = useCallback(() => {
        onReset()
    }, [onReset])

    const onPropertyChange = useCallback((value, property) => {
        dispatch({
            type: GetBannerAction.SET_BANNER_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value
                }
            }
        })
    }, [dispatch])

    const onPopularBannerChange = useCallback((value) => {
        onPropertyChange(value, 'popular')
    }, [onPropertyChange])

    const handleModalClose = useCallback(() => {
        handleClose()
        onReset()
    },[onReset, handleClose])
    return <div className={styles['banner-left-wrapper']}>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4>{isEditing ? '編輯' : '新增'}</h4>
                    </CardHeader>
                    <CardBody>
                        <form ref={formRef} name='class-form' onSubmit={onAddNewEditor}>
                            <div className={styles['input-group']}>
                                <input type="hidden" name='_id' value={id} onChange={e => onPropertyChange(e.target.value, 'id')} />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="name">Banner名稱</label>
                                <input type="text" name='name' value={BannerName} onChange={e => onPropertyChange(e.target.value, 'BannerName')} />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="title">title</label>
                                <input type="text" name='title' value={BannerTitle} onChange={e => onPropertyChange(e.target.value, 'title')} />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="description">description</label>
                                <input type="text" name='description' value={description} onChange={e => onPropertyChange(e.target.value, 'description')} />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="keywords">keywords</label>
                                <input type="text" name='keywords' value={keywords} onChange={e => onPropertyChange(e.target.value, 'keywords')} />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="manualUrl">自訂網址</label>
                                <input type="text" name='manualUrl'
                                    value={manualUrl} onChange={e => onPropertyChange(e.target.value, 'manualUrl')} />
                            </div>
                            {manualUrl.length > 0 || customUrl
                                ? <div className={styles['input-group']}>
                                    <label htmlFor="customUrl">前台顯示網址</label>
                                    {manualUrl.length > 0
                                        ? <input readOnly disabled type="text" name='manualUrl' value={`p_${manualUrl}.html`} />
                                        : <div><a target="_blank" rel="noopener noreferrer" href={customUrl}>{customUrl}</a></div>
                                    }
                                </div>
                                : null
                            }
                            <div className={styles['input-group']}>
                                <CustomRadio
                                    value={popular}
                                    label={'是否設為熱門Banner'}
                                    setState={onPopularBannerChange} />
                            </div>
                            {popular && <div className={styles['input-group']}>
                                <label htmlFor="sorting">熱門Banner排序</label>
                                <input type="number" name='sorting' min={1}
                                    value={sorting} onChange={e => onPropertyChange(e.target.value, 'sorting')} />
                            </div>}
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
            success={success}
            open={open}
            setClose={handleModalClose}
        />
    </div >;
}


