import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';
import CardBody from 'components/Card/CardBody.jsx';
import TagSearchForm from './TagSearchForm';
import MessageDialog from '../../components/Modal/MessageDialog';
import RowHeader from '../EditorList/RowHeader';
import RowBody from './RowBody';
import TagButtonList from './TagButtonList';
import useModal from "../../hook/useModal";
import useEditorListResult from "../../hook/useEditorListResult";

const headerMap = {
    headerRow: [
        { name: "標籤名稱", patchKey: "name" },
        { name: "創建日期", patchKey: "createDate" },
        { name: "標籤觸及次數", patchKey: "pageView" },
        { name: "熱門標籤排序", patchKey: "sorting" },
        { name: "編輯" }
    ],
    patchType: GetTagsAction.SHOW_TAG_LIST_SORTING,
    reducerName: 'getTagsReducer'
}

export default function TagRightBody() {

    const showList = useSelector((state) => state.getTagsReducer.showTagList);
    const currentPage = useSelector((state) => state.getTagsReducer.currentPage);
    const totalPage = useSelector((state) => state.getTagsReducer.totalPage);
    const totalCount = useSelector((state) => state.getTagsReducer.totalCount);
    const serverMessage = useSelector((state) => state.getTagsReducer.errorMessage);
    console.log("🚀 ~ file: TagRightBody.jsx:29 ~ TagRightBody ~ showList:", showList)

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
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal()

    return <CardBody>
        <TagSearchForm />
        <TagButtonList
            currentPage={currentPage}
            totalPage={totalPage}
            totalCount={totalCount}
        />
        <form name='view-class-form' className={'view-list-form'}>
            <RowHeader headerConfig={headerMap} />
            <RowBody
                headerConfig={headerMap}
                showList={showList}
                handleOpenDialog={handleOpenDialog}
                messageDialogReturnValue={messageDialogReturnValue}
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