
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
import useEditorListResult from '../../hook/useEditorListResult';
import useModal from '../../hook/useModal';

const headerMap = {
    headerRow: [
        { name: "序號", patchKey: "serialNumber" },
        { name: "圖片/影片" },
        { name: "分類", patchKey: "categories.label" },
        { name: "標題", patchKey: "content.title", className: "editor-list-title" },
        { name: "瀏覽數", patchKey: "pageView" },
        { name: "狀態", patchKey: "status" },
        { name: "更新日期", patchKey: "updateDate" },
        { name: "編輯" }
    ],
    patchType: GetEditorAction.SHOW_EDITOR_LIST_SORTING,
    reducerName: 'getEditorReducer'
}

export default function EditorListBody() {

    const {
        showList,
        currentPage,
        totalPage,
        errorMessage: serverMessage
    } = useSelector((state) => state.getEditorReducer);
    console.log("🚀 ~ file: EditorListBody.jsx:34 ~ EditorListBody ~ showList:", showList)

    const {
        message: dialogMessage,
        contentData,
        data,
        confirm,
        messageDialogReturnValue
    } = useSelector((state) => state.getDialogReducer);

    const errorMessage = getErrorMessage(dialogMessage, serverMessage)
    function getErrorMessage(errorMessage, returnMessage) {
        console.log("🚀 ~ file: index.jsx:40 ~ getErrorMessage ~ returnMessage:", returnMessage)
        console.log("🚀 ~ file: index.jsx:40 ~ getErrorMessage ~ errorMessage:", errorMessage)
        if (errorMessage) {
            return errorMessage;
        }
        if (returnMessage) {
            return returnMessage;
        }
        return null;

    }

    const {
        title,
        content,
        success
    } = useEditorListResult(errorMessage, contentData, data)

    useEffect(() => {
        if (title) handleOpenDialog()
    }, [title, content]);

    const {
        open,
        handleOpen,
        handleClose
    } = useModal()

    const {
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal()

    const [mediaInfo, setMediaInfo] = useState(null);

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
            dialogContent={content}
            success={success}
            open={openDialog}
            setClose={handleCloseDialog}
            confirm={confirm}
            data={data}
        />
    </CardBody>;
}

