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

    const {
        showList,
        currentPage,
        totalPage,
        errorMessage: serverMessage
    } = useSelector((state) => state.getClassReducer);

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
                            />
                            <form className='view-list-form' name='view-class-form'>
                                <RowHeader headerConfig={headerMap} />
                                <RowBody
                                    headerConfig={headerMap}
                                    showList={showList}
                                    handleOpenDialog={handleOpenDialog}
                                    messageDialogReturnValue={messageDialogReturnValue}
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


