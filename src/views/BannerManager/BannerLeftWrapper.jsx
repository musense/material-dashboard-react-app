import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as GetBannerAction from 'actions/GetBannerAction';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import styles from './BannerList.module.css'
import usePressEnterEventHandler from 'hook/usePressEnterEventHandler';
import useModalResult from 'hook/useModalResult';

import MessageDialog from 'components/Modal/MessageDialog';
import useModal from 'hook/useModal';
import Media from 'components/Media/Media';
import FormButtonList from 'components/FormButtonList/FormButtonList';
import BannerPublishInfo from './BannerPublishInfo';
import MyScrollbar from 'components/MyScrollbar/MyScrollbar';
import { getIsEditing, getShowUrl } from 'reducers/GetBannerReducer';

// import { useDebounce } from 'react-use'

export default function BannerLeftWrapper() {

    const formRef = useRef(null);
    const dispatch = useDispatch();


    const id = useSelector((state) => state.getBannerReducer.selectedBanner._id);
    const name = useSelector((state) => state.getBannerReducer.selectedBanner.name);
    const sort = useSelector((state) => state.getBannerReducer.selectedBanner.sort);
    const hyperlink = useSelector((state) => state.getBannerReducer.selectedBanner.hyperlink);
    const note = useSelector((state) => state.getBannerReducer.selectedBanner.remark);
    const homeImagePath = useSelector((state) => state.getBannerReducer.selectedBanner.media.homeImagePath);
    const contentImagePath = useSelector((state) => state.getBannerReducer.selectedBanner.media.contentImagePath);
    const startDate = useSelector((state) => state.getBannerReducer.selectedBanner.startDate);
    const endDate = useSelector((state) => state.getBannerReducer.selectedBanner.endDate);
    const status = useSelector((state) => state.getBannerReducer.selectedBanner.status);


    const isEditing = useSelector(getIsEditing);
    const showUrl = useSelector(getShowUrl);
    const serverMessage = useSelector((state) => state.getBannerReducer.errorMessage);


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

        if (!name) {
            dispatch({
                type: GetBannerAction.SET_ERROR_MESSAGE,
                payload: {
                    message: 'please add Banner name',
                }
            })
            return
        }

        let tempData = {
            name: name,
            sort: sort,
            hyperlink: hyperlink,
            remark: note,
            // eternal: eternal,
            // display: display,
            media: {
                homeImagePath: homeImagePath,
                contentImagePath: contentImagePath,
            },
            startDate: new Date(startDate).getTime(),
            endDate: new Date(endDate).getTime(),
            status: status,
        }

        if (sort) {
            if (typeof parseInt(sort) !== 'number') {
                dispatch({
                    type: GetBannerAction.SET_ERROR_MESSAGE,
                    payload: {
                        message: 'sorting should be typeof number',
                    }
                })
                return
            }
            if (parseInt(sort) < 1) {
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
                sort: sort
            }
        }

        console.log("🚀 ~ file: BannerLeftWrapper.jsx:86 ~ onAddNewEditor ~ tempData:", tempData)
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

    const onPropertyChange = useCallback((value, property, info = null) => {
        dispatch({
            type: GetBannerAction.SET_BANNER_PROPERTY,
            payload: {
                allProps: {
                    property: property,
                    value: value,
                    info: info
                }
            }
        })
    }, [dispatch])

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
    return <div className={styles['banner-left-wrapper']}>
        <Card style={{ height: 'calc(100% - 50px)' }}>
            <CardHeader color="primary">
                <h4>{isEditing ? '編輯' : '新增'}</h4>
            </CardHeader>
            <CardBody style={{ paddingRight: 0 }}>
                <MyScrollbar component='form' height='700px'>
                    <form ref={formRef} name='class-form' className='banner-submit-form' onSubmit={onAddNewEditor}>
                        <div>
                            <input type="hidden" name='_id' value={id} />
                        </div>
                        <div>
                            <label htmlFor="name">Banner名稱</label>
                            <input type="text" name='name' value={name} onChange={e => onPropertyChange(e.target.value, 'name')} />
                        </div>
                        <div>
                            <label htmlFor="sorting">排序</label>
                            <input type="number" min={1} name='sorting' value={sort} onChange={e => onPropertyChange(e.target.value, 'sort')} />
                        </div>
                        <div>
                            <label htmlFor="hyperlink">超連結</label>
                            <input type="text" name='hyperlink' value={hyperlink} onChange={e => onPropertyChange(e.target.value, 'hyperlink')} />
                        </div>
                        <Media
                            styles={styles}
                            onPropertyChange={onPropertyChange}
                            onShowUrlChange={onShowUrlChange}
                            showUrl={showUrl}
                            alt={false}
                        />
                        <BannerPublishInfo
                            // isOnShelvesImmediate={isOnShelvesImmediate}
                            // isPermanent={isPermanent}
                            startDate={startDate}
                            endDate={endDate}
                            onPropertyChange={onPropertyChange}
                        />
                        <div>
                            <label htmlFor="note">備註</label>
                            <textarea type="text" name='note' value={note} onChange={e => onPropertyChange(e.target.value, 'remark')} />
                        </div>
                        <FormButtonList
                            isEditing={isEditing}
                            onCancel={onCancel}
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


