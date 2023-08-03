
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
        { name: "圖片/影片", className: "flex-2 image-container" },
        { name: "分類", patchKey: "categories.name", className: "flex-2" },
        { name: "標題", patchKey: "content.title", className: "flex-3" },
        { name: "瀏覽數", patchKey: "pageView" },
        { name: "狀態", patchKey: "status", className: "flex-2" },
        { name: "更新日期", patchKey: "updateDate", className: "flex-2" },
        { name: "編輯", className: "flex-2" }
    ],
    patchType: GetEditorAction.SHOW_EDITOR_LIST_SORTING,
    reducerName: 'getEditorReducer'
}

export default function EditorListBody() {

    const showList = useSelector((state) => state.getEditorReducer.showList);
    const currentPage = useSelector((state) => state.getEditorReducer.currentPage);
    const totalPage = useSelector((state) => state.getEditorReducer.totalPage);
    const totalCount = useSelector((state) => state.getEditorReducer.totalCount);
    const serverMessage = useSelector((state) => state.getEditorReducer.errorMessage);

    console.log("🚀 ~ file: EditorListBody.jsx:34 ~ EditorListBody ~ showList:", showList)

    const contentData = useSelector((state) => state.getDialogReducer.contentData);
    const data = useSelector((state) => state.getDialogReducer.data);
    const confirm = useSelector((state) => state.getDialogReducer.confirm);
    const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);
    const dialogMessage = useSelector((state) => state.getDialogReducer.message);

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

