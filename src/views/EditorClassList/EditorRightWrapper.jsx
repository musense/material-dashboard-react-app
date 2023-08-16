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
import useModalResult from '../../hook/useModalResult';
import useDeleteSelectedRow from 'hook/useDeleteSelectedRow';
import getErrorMessage from 'utils/getErrorMessage';

const headerMap = {
    headerRow: [
        { name: '分類名稱', patchKey: 'name', type: "string" },
        { name: '英文名稱', patchKey: 'keyName', type: "string" },
        { name: '編輯' },
    ],
    patchType: GetClassAction.SHOW_CLASS_LIST_SORTING,
    reducerName: 'getClassReducer',
};

export default function EditorRightWrapper() {

    const maxSizeClassName = useSelector((state) => state.getConfigReducer.maxSizeClassName);

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

    const {
        title,
        content,
        success
    } = useModalResult({
        message: errorMessage,
        name: '分類',
        data: contentData
    })

    const {
        open: openDialog,
        handleOpen: handleOpenDialog,
        handleClose: handleCloseDialog
    } = useModal(title)

    return (
        <div className={`${styles['editor-right-wrapper']} ${styles[maxSizeClassName]}`}>
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
                            <form className='view-list-form'>
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


