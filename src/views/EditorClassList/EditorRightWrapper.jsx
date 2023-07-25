import React, { useState } from 'react';

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
    const title = useSelector((state) => state.getDialogReducer.title);
    const message = useSelector((state) => state.getDialogReducer.message);
    const confirm = useSelector((state) => state.getDialogReducer.confirm);
    const data = useSelector((state) => state.getDialogReducer.data);
    const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

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
                dialogContent={message}
                open={openDialog}
                setClose={handleCloseDialog}
                confirm={confirm}
                data={data}
            />
        </div>
    );
}


