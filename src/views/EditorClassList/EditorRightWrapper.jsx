import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';

import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import styles from './EditorClassList.module.css';
import EditorClassButtonList from './EditorClassButtonList';
import EditorHeader from './EditorHeader';

import MessageDialog from 'components/Modal/MessageDialog';
import RowHeader from '../EditorList/RowHeader';
import RowBody from './RowBody';
import useModal from '../../hook/useModal';
import useEditorListResult from '../../hook/useEditorListResult';
import useDeleteSelectedRow from 'hook/useDeleteSelectedRow';
const headerMap = {
    headerRow: [
        { name: '分類名稱', patchKey: 'name' },
        { name: '英文名稱', patchKey: 'keyName' },
        { name: '編輯' },
    ],
    patchType: GetClassAction.SHOW_CLASS_LIST_SORTING,
    reducerName: 'getClassReducer',
};

export default function EditorRightWrapper() {

    const showList = useSelector((state) => state.getClassReducer.showList);
    const currentPage = useSelector((state) => state.getClassReducer.currentPage);
    const totalPage = useSelector((state) => state.getClassReducer.totalPage);
    const totalCount = useSelector((state) => state.getClassReducer.totalCount);
    const serverMessage = useSelector((state) => state.getClassReducer.errorMessage);

    console.log("🚀 ~ file: EditorRightWrapper.jsx:33 ~ EditorRightWrapper ~ showList:", showList)

    const contentData = useSelector((state) => state.getDialogReducer.contentData);
    const data = useSelector((state) => state.getDialogReducer.data);
    const confirm = useSelector((state) => state.getDialogReducer.confirm);
    const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);
    const dialogMessage = useSelector((state) => state.getDialogReducer.message);

    useDeleteSelectedRow(messageDialogReturnValue, {
        deleteType: GetClassAction.BUNCH_DELETE_CLASS
    });

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
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(title)

    return (
        <div className={styles['editor-right-wrapper']}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <EditorHeader />
                        <CardBody>
                            <EditorClassButtonList
                                currentPage={currentPage}
                                totalPage={totalPage}
                                totalCount={totalCount}
                            />
                            <form className='view-list-form' name='view-class-form'>
                                <RowHeader headerConfig={headerMap} />
                                <RowBody
                                    headerConfig={headerMap}
                                    showList={showList}
                                    handleOpenDialog={handleOpenDialog}
                                    className="editor-class"
                                />
                            </form>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <MessageDialog
                dialogTitle={title}
                dialogContent={content}
                success={success}
                open={openDialog}
                setClose={handleCloseDialog}
                confirm={confirm}
                data={data}
            />
        </div>
    );
}


