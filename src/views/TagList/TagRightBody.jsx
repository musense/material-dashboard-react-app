import React from "react";
import { useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';
import CardBody from 'components/Card/CardBody.jsx';
import TagSearchForm from './TagSearchForm';
import MessageDialog from '../../components/Modal/MessageDialog';
import RowHeader from '../EditorList/RowHeader';
import RowBody from './RowBody';
import TagButtonList from './TagButtonList';
import useModal from "../../hook/useModal";
import useModalResult from "hook/useModalResult";
import useDeleteSelectedRow from 'hook/useDeleteSelectedRow';
import getErrorMessage from "utils/getErrorMessage";
import {
    getTagShowList,
    getCurrentPage,
    getTotalPage,
    getTotalCount,
    getTagErrorMessage,
    getSelectedPatchKey
} from "reducers/GetTagsReducer";

const headerMap = {
    headerRow: [
        { name: "標籤名稱", patchKey: "name", type: "string" },
        { name: "創建日期", patchKey: "createDate", type: "date" },
        { name: "標籤觸及次數", patchKey: "pageView", type: "number" },
        { name: "熱門標籤排序", patchKey: "sorting", type: "number" },
        { name: "編輯" }
    ],
    patchType: GetTagsAction.SHOW_TAG_LIST_SORTING,
    reducerName: 'getTagsReducer'
}

export default function TagRightBody() {

    const currentPage = useSelector(getCurrentPage);
    const showList = useSelector(getTagShowList);
    const totalPage = useSelector(getTotalPage);
    const totalCount = useSelector(getTotalCount);
    const selectedPatchKey = useSelector(getSelectedPatchKey);
    const serverMessage = useSelector(getTagErrorMessage);
    console.log("🚀 ~ file: TagRightBody.jsx:29 ~ TagRightBody ~ showList:", showList)

    const {
        message: dialogMessage,
        contentData,
        data,
        confirm,
        messageDialogReturnValue
    } = useSelector((state) => state.getDialogReducer);

    useDeleteSelectedRow(messageDialogReturnValue, {
        deleteType: GetTagsAction.BUNCH_DELETE_TAG
    });

    const errorMessage = getErrorMessage(dialogMessage, serverMessage)

    const {
        title,
        content,
        success
    } = useModalResult({
        message: errorMessage,
        name: '標籤',
        data: contentData,
    })

    const {
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(title)

    return <CardBody>
        <TagSearchForm />
        <TagButtonList
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
                handleOpenDialog={handleOpenDialog}
                className={'tag'}
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