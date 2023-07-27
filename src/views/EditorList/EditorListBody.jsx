
import React, { useState } from 'react';
import CardBody from 'components/Card/CardBody.jsx';
import { useSelector } from 'react-redux';
import MediaModal from '../../components/Modal/MediaModal';
import * as GetEditorAction from '../../actions/GetEditorAction';
import EditorSearchForm from './EditorSearchForm';
import EditorListButtonList from './EditorListButtonList';
import RowHeader from './RowHeader';
import RowBody from './RowBody';
import MessageDialog from '../../components/Modal/MessageDialog';


const headerMap = {
    headerRow: [
        { name: "序號", patchKey: "serialNumber" },
        { name: "圖片/影片" },
        { name: "分類", patchKey: "categories.label" },
        { name: "標題", patchKey: "content.title", className: "editor-list-title" },
        { name: "狀態", patchKey: "status" },
        { name: "更新日期", patchKey: "updateDate" },
        { name: "編輯" }
    ],
    patchType: GetEditorAction.SHOW_EDITOR_LIST_SORTING,
    reducerName: 'getEditorReducer'
}

export default function EditorListBody() {

    const showList = useSelector((state) => state.getEditorReducer.showList);
    const currentPage = useSelector((state) => state.getEditorReducer.currentPage);
    const totalPage = useSelector((state) => state.getEditorReducer.totalPage);
    console.log("🚀 ~ file: EditorListBody.jsx:28 ~ totalPage:", totalPage)
    console.log("🚀 ~ file: EditorListBody.jsx:28 ~ showList:", showList)

    const title = useSelector((state) => state.getDialogReducer.title);
    const message = useSelector((state) => state.getDialogReducer.message);
    const confirm = useSelector((state) => state.getDialogReducer.confirm);
    const data = useSelector((state) => state.getDialogReducer.data);
    const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [mediaInfo, setMediaInfo] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    return <CardBody>
        <EditorSearchForm />
        <EditorListButtonList
            currentPage={currentPage}
            totalPage={totalPage}
        />
        <form className='view-list-form' name='view-editor-list-form' >
            <RowHeader headerConfig={headerMap} />
            <RowBody
                headerConfig={headerMap}
                showList={showList}
                handleOpen={handleOpen}
                setMediaInfo={setMediaInfo}
                handleOpenDialog={handleOpenDialog}
                messageDialogReturnValue={messageDialogReturnValue}
            />
        </form>
        <MediaModal
            open={open}
            handleClose={handleClose}
            mediaInfo={mediaInfo}
        />
        <MessageDialog
            dialogTitle={title}
            dialogContent={message}
            open={openDialog}
            setClose={handleCloseDialog}
            confirm={confirm}
            data={data}
        />
    </CardBody>;
}

