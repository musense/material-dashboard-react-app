import React from "react";
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

const headerMap = {
    headerRow: [
        { name: "序號", patchKey: "serialNumber" },
        { name: "Banner名稱", patchKey: "name" },
        { name: "圖片/影片", className: "flex-2 image-container" },
        { name: "替代文字", patchKey: "altText" },
        { name: "排序", patchKey: "order" },
        { name: "超連結", patchKey: "hyperlink" },
        { name: "開始時間", patchKey: "startDate" },
        { name: "結束時間", patchKey: "endDate" },
        { name: "狀態", patchKey: "status" },
        { name: "編輯", className: "flex-2" }
    ],
    patchType: GetBannerAction.SHOW_BANNER_LIST_SORTING,
    reducerName: 'getBannerReducer'
}

export default function BannerRightBody() {

    const showList = useSelector((state) => state.getBannerReducer.showBannerList);
    const currentPage = useSelector((state) => state.getBannerReducer.currentPage);
    const totalPage = useSelector((state) => state.getBannerReducer.totalPage);
    const totalCount = useSelector((state) => state.getBannerReducer.totalCount);
    const serverMessage = useSelector((state) => state.getBannerReducer.errorMessage);
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
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(title)

    return <CardBody>
        <BannerSearchForm />
        <BannerButtonList
            currentPage={currentPage}
            totalPage={totalPage}
            totalCount={totalCount}
        />
        <form className='view-list-form'>
            <RowHeader headerConfig={headerMap} />
            <RowBody
                headerConfig={headerMap}
                showList={showList}
                handleOpenDialog={handleOpenDialog}
                className={'Banner'}
            />

        </form>
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