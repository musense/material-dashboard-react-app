
import React, { useEffect, useState } from 'react';
import CardBody from 'components/Card/CardBody.jsx';
import { useSelector } from 'react-redux';
import MediaModal from '../../components/Modal/MediaModal';
import * as GetEditorAction from '../../actions/GetEditorAction';
import EditorSearchForm from './EditorSearchForm';
import EditorListButtonList from './EditorListButtonList';
import RowHeader from './RowHeader';
import RowBody from './RowBody';
import MessageDialog from '../../components/Modal/MessageDialog';
import useModalResult from '../../hook/useModalResult';
import useModal from '../../hook/useModal';
import useDeleteSelectedRow from 'hook/useDeleteSelectedRow';
import getErrorMessage from 'utils/getErrorMessage';

import {
    getTotalPage,
    getCurrentPage,
    getTotalCount,
    getEditorShowList,
    getEditorErrorMessage,
    getSelectedPatchKey
} from 'reducers/GetEditorReducer'

const headerMap = {
    headerRow: [
        { name: "序號", patchKey: "serialNumber", type: "number" },
        { name: "圖片/影片", className: "flex-2 image-container" },
        { name: "分類", patchKey: "categories.name", className: "flex-2", type: "string" },
        { name: "標題", patchKey: "content.title", className: "flex-3", type: "string" },
        { name: "瀏覽數", patchKey: "pageView", type: "number" },
        { name: "狀態", patchKey: "status", className: "flex-2", type: "string" },
        { name: "更新日期", patchKey: "updateDate", className: "flex-2", type: "date" },
        { name: "編輯", className: "flex-2" }
    ],
    patchType: GetEditorAction.SHOW_EDITOR_LIST_SORTING,
    reducerName: 'getEditorReducer'
}

export default function EditorListBody() {

    const showList = useSelector(getEditorShowList);
    const currentPage = useSelector(getCurrentPage);
    const totalPage = useSelector(getTotalPage);
    const totalCount = useSelector(getTotalCount);
    const selectedPatchKey = useSelector(getSelectedPatchKey);
    const serverMessage = useSelector(getEditorErrorMessage);

    console.log("🚀 ~ file: EditorListBody.jsx:34 ~ EditorListBody ~ showList:", showList)

    const contentData = useSelector((state) => state.getDialogReducer.contentData);
    const data = useSelector((state) => state.getDialogReducer.data);
    const confirm = useSelector((state) => state.getDialogReducer.confirm);
    const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);
    const dialogMessage = useSelector((state) => state.getDialogReducer.message);

    const errorMessage = getErrorMessage(dialogMessage, serverMessage)

    useDeleteSelectedRow(messageDialogReturnValue, {
        deleteType: GetEditorAction.BUNCH_DELETE_EDITOR
    });

    const {
        title,
        content,
        success
    } = useModalResult({
        message: errorMessage,
        name: '文章',
        data: contentData,
    })

    const {
        open,
        handleOpen,
        handleClose
    } = useModal()

    const {
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(title)


    const [mediaInfo, setMediaInfo] = useState(null);

    return <CardBody>
        <EditorSearchForm />
        <EditorListButtonList
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

