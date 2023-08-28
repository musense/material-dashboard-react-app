import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as GetBannerAction from 'actions/GetBannerAction';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import useModalResult from 'hook/useModalResult';

import MessageDialog from 'components/Modal/MessageDialog';
import useModal from 'hook/useModal';
import Media from 'components/Media/Media';
import FormButtonList from 'components/FormButtonList/FormButtonList';
import BannerPublishInfo from './BannerPublishInfo';
import MyScrollbar from 'components/MyScrollbar/MyScrollbar';
import {
    getBannerErrorMessage,
    getIsEditing,
    getSelectedBanner,
    getSelectedBannerMedia,
    getSelectedBannerPublishInfo,
    getSelectedBannerPublishInfoSchedulePeriod,
    getShowUrl
} from 'reducers/GetBannerReducer';
import SingleBannerStatusSelector from 'components/Select/SingleBannerStatusSelect'
import { Checkbox, FormControlLabel } from '@mui/material';

export default function BannerLeftWrapper({ styles }) {

    const formRef = useRef(null);
    const dispatch = useDispatch();

    const selectedBanner = useSelector(getSelectedBanner)
    console.log("🚀 ~ file: BannerLeftWrapper.jsx:35 ~ BannerLeftWrapper ~ selectedBanner:", selectedBanner)
    const selectedBannerMedia = useSelector(getSelectedBannerMedia)
    const selectedBannerPublishInfo = useSelector(getSelectedBannerPublishInfo)
    const selectedBannerSchedulePeriod = useSelector(getSelectedBannerPublishInfoSchedulePeriod)

    // const id = selectedBanner._id
    // const name = selectedBanner.name
    // const sort = selectedBanner.sort
    // const remark = selectedBanner.remark
    // const status = selectedBanner.status

    const homeImagePath = selectedBannerMedia.homeImagePath
    const contentImagePath = selectedBannerMedia.contentImagePath
    // const hyperlink = selectedBannerMedia.hyperlink

    // const startDate = selectedBannerPublishInfo.startDate
    // const endDate = selectedBannerPublishInfo.endDate


    const isEditing = useSelector(getIsEditing);
    const showUrl = useSelector(getShowUrl);
    const serverMessage = useSelector(getBannerErrorMessage);


    usePressEnterEventHandler(formRef)
    const {
        title,
        content,
        success
    } = useModalResult({
        message: serverMessage,
        name: 'Banner'
    })

    const {
        open,
        handleClose
    } = useModal(title)

    function onAddNewEditor(e) {
        e.preventDefault()

        if (!selectedBanner.name) {
            dispatch({
                type: GetBannerAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add Banner name',
                }
            })
            return
        }

        let tempData = {
            name: selectedBanner.name,
            sort: selectedBanner.sort,
            hyperlink: selectedBannerMedia.hyperlink,
            remark: selectedBanner.remark,
            status: selectedBanner.status,
            // eternal: eternal,
            // display: display,
            media: {
                homeImagePath: selectedBannerMedia.homeImagePath,
                contentImagePath: selectedBannerMedia.contentImagePath,
            },
            publishInfo: {
                isEternal: false,
                isDisplay: false,
                isScheduled: false,
                scheduledAt: {
                    startDate: new Date(selectedBannerPublishInfo.startDate).getTime(),
                    endDate: new Date(selectedBannerPublishInfo.endDate).getTime(),
                }
            }


        }

        if (selectedBanner.sort) {
            if (typeof parseInt(selectedBanner.sort) !== 'number') {
                dispatch({
                    type: GetBannerAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be typeof number',
                    }
                })
                return
            }
            if (parseInt(selectedBanner.sort) < 1) {
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
                sort: selectedBanner.sort
            }
        }

        console.log("🚀 ~ file: BannerLeftWrapper.jsx:86 ~ onAddNewEditor ~ tempData:", tempData)
        return
        if (isEditing === true) {
            dispatch({
                type: GetBannerAction.EDIT_SAVING_BANNER,
                payload: {
                    ...tempData,
                    _id: selectedBanner._id
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

    const onReset = useCallback(() => {
        dispatch({
            type: GetBannerAction.CANCEL_EDITING_BANNER
        })
    }, [dispatch])

    const onPropertyChange = useCallback((value, property, info = null, detail = null) => {
        dispatch({
            type: GetBannerAction.SET_BANNER_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value,
                    info: info,
                    detail: detail
                }
            }
        })
    }, [dispatch])

    const onStatusChange = useCallback((value) => {
        onPropertyChange(value, 'status')
    }, [onPropertyChange])

    const onShowUrlChange = useCallback((value) => {
        dispatch({
            type: GetBannerAction.SET_SHOW_URL,
            payload: {
                showUrl: value
            }
        })
    }, [dispatch])

    const handleModalClose = useCallback(() => {
        handleClose()
        onReset()
    }, [onReset, handleClose])

    const statusStyle = {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '24px',
        color: selectedBanner.status === '進行中'
            ? '#009900'
            : selectedBanner.status === '已排程'
                ? '#000099'
                : selectedBanner.status === '下架'
                    ? '#990000'
                    : '#000000',
        textAlign: 'center',
        lineHeight: '60px',
    }
    const statusString = selectedBanner.status === '下架' ? '已下架' : selectedBanner.status
    const checkboxString = selectedBanner.status === '下架' ? "上架" : "下架"
    return <div className={styles['banner-left-wrapper']}>
        <Card>
            <CardHeader color="primary">
                <h4>{isEditing ? '編輯' : '新增'}</h4>
            </CardHeader>
            <CardBody>
                <MyScrollbar component='form' height='700px'>
                    <form ref={formRef} name='class-form' className='banner-submit-form' onSubmit={onAddNewEditor}>
                        <div>
                            <input type="hidden" name='_id' value={selectedBanner._id} />
                        </div>
                        <div className={styles['banner-status']}>
                            <span style={statusStyle}>{statusString}</span>

                            {selectedBanner.status !== '' && <FormControlLabel control={<Checkbox />} label={checkboxString} />}
                        </div>
                        <div>
                            <label htmlFor="name">Banner名稱</label>
                            <input type="text" name='name' value={selectedBanner.name} onChange={e => onPropertyChange(e.target.value, 'name')} />
                        </div>
                        <div>
                            <label htmlFor="sorting">排序</label>
                            <input type="number" min={1} name='sorting' value={selectedBanner.sort} onChange={e => onPropertyChange(e.target.value, 'sort')} />
                        </div>
                        <div>
                            <label htmlFor="hyperlink">超連結</label>
                            <input type="text" name='hyperlink' value={selectedBannerMedia.hyperlink} onChange={e => onPropertyChange(e.target.value, 'hyperlink', 'media')} />
                        </div>
                        <Media
                            styles={styles}
                            onPropertyChange={onPropertyChange}
                            onShowUrlChange={onShowUrlChange}
                            showUrl={showUrl}
                            alt={false}
                        />
                        <BannerPublishInfo
                            isEternal={selectedBannerSchedulePeriod.isEternal}
                            isDisplay={selectedBannerSchedulePeriod.isDisplay}
                            startDate={selectedBannerSchedulePeriod.startDate}
                            endDate={selectedBannerSchedulePeriod.endDate}
                            onPropertyChange={onPropertyChange}
                        />
                        <div>
                            <label htmlFor="remark">備註</label>
                            <textarea type="text" name='remark' value={selectedBanner.remark} onChange={e => onPropertyChange(e.target.value, 'remark')} />
                        </div>
                        <FormButtonList
                            isEditing={isEditing}
                            onReset={onReset}
                            callback={onAddNewEditor}
                        />
                    </form>
                </MyScrollbar>
            </CardBody>
        </Card>
        <MessageDialog
            dialogTitle={title}
            dialogContent={content}
            success={success}
            open={open}
            setClose={handleModalClose}
        />
    </div >;
}


