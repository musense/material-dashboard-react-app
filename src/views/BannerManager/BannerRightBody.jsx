import React, { useState } from "react";
import { useSelector } from 'react-redux';
import * as GetBannerAction from '../../actions/GetBannerAction';
import CardBody from 'components/Card/CardBody.jsx';
import BannerSearchForm from './BannerSearchForm';
import MessageDialog from '../../components/Modal/MessageDialog';
import RowHeader from '../EditorList/RowHeader';
import RowBody from './RowBody';
import BannerButtonList from './BannerButtonList';
import useModal from "../../hook/useModal";
import useModalResult from "../../hook/useModalResult";
import useDeleteSelectedRow from "hook/useDeleteSelectedRow";
import getErrorMessage from "utils/getErrorMessage";
import {
    getBannerErrorMessage,
    getBannerShowList,
    getCurrentPage,
    getSelectedPatchKey,
    getTotalCount,
    getTotalPage
} from "reducers/GetBannerReducer";
import MediaModal from "components/Modal/MediaModal";


const headerMap = {
    headerRow: [
        { name: "序號", patchKey: "serialNumber", className: "flex-1" },
        { name: "Banner名稱", patchKey: "name", className: "flex-2" },
        { name: "圖片/影片", className: "flex-2 image-container" },
        { name: "排序", patchKey: "sort", className: "flex-1" },
        { name: "超連結", patchKey: "hyperlink", className: "flex-2" },
        { name: "排程時間", patchKey: "startDate", className: "flex-2" },
        { name: "狀態", patchKey: "status" },
        { name: "編輯", className: "flex-1" }
    ],
    patchType: GetBannerAction.SHOW_BANNER_LIST_SORTING,
    reducerName: 'getBannerReducer'
}

export default function BannerRightBody() {


    const selectedPatchKey = useSelector(getSelectedPatchKey);
    const currentPage = useSelector(getCurrentPage);
    const showList = useSelector(getBannerShowList)
    const totalPage = useSelector(getTotalPage);
    const totalCount = useSelector(getTotalCount);
    const serverMessage = useSelector(getBannerErrorMessage);

    console.log("🚀 ~ file: BannerRightBody.jsx:29 ~ BannerRightBody ~ showList:", showList)

    const {
        message: dialogMessage,
        contentData,
        data,
        confirm,
        messageDialogReturnValue
    } = useSelector((state) => state.getDialogReducer);

    useDeleteSelectedRow(messageDialogReturnValue, {
        deleteType: GetBannerAction.BUNCH_DELETE_BANNER
    });

    const errorMessage = getErrorMessage(dialogMessage, serverMessage)

    const {
        title,
        content,
        success
    } = useModalResult({
        message: errorMessage,
        name: 'Banner',
        data: contentData,
    })

    const {
        open,
        handleOpen,
        handleClose
    } = useModal()

    const {
        open: openDialog,
        handleClose: handleCloseDialog
    } = useModal(title)

    const [mediaInfo, setMediaInfo] = useState(null);

    return <CardBody>
        <BannerSearchForm />
        <BannerButtonList
            currentPage={currentPage}
            totalPage={totalPage}
            totalCount={totalCount}
        />
        <form className='view-list-form'>
            <RowHeader
                headerConfig={headerMap}
                selectedPatchKey={selectedPatchKey} />
            <RowBody
                headerConfig={headerMap}
                showList={showList}
                handleOpen={handleOpen}
                setMediaInfo={setMediaInfo}
                className={'Banner'}
            />

        </form>
        <MediaModal
            open={open}
            handleClose={handleClose}
            mediaInfo={mediaInfo}
        />
        <MessageDialog
            dialogTitle={title}
            dialogContent={content}
            success={success}
            open={openDialog}
            setClose={handleCloseDialog}
            confirm={confirm}
            data={data}
        />
    </CardBody>;
}