import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';

import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import styles from './TagList.module.css'

import TagSearchForm from './TagSearchForm';
import MessageDialog from '../Pages/MessageDialog';
import RowHeader from '../EditorList/RowHeader';
import RowBody from './RowBody';
import TagButtonList from './TagButtonList';

const headerMap = {
    headerRow: [
        { name: "標籤名稱", patchKey: "name" },
        { name: "創建日期", patchKey: "createDate" },
        { name: "編輯" }
    ],
    patchType: GetTagsAction.SHOW_TAG_LIST_SORTING,
    reducerName: 'getTagsReducer'
}


export default function TagRightWrapper() {
    return <div className={styles['tag-right-wrapper']}>
        <Card>
            <TagRightHeader />
            <TagRightBody />
        </Card>
    </div>;
}

const TagRightHeader = () => {
    return <CardHeader color='primary'>
        <h4>標籤管理</h4>
    </CardHeader>;
}

function TagRightBody() {

    const showTagList = useSelector((state) => state.getTagsReducer.showTagList);
    const currentPage = useSelector((state) => state.getTagsReducer.currentPage);
    const totalPage = useSelector((state) => state.getTagsReducer.totalPage);

    const title = useSelector((state) => state.getDialogReducer.title);
    const message = useSelector((state) => state.getDialogReducer.message);
    const confirm = useSelector((state) => state.getDialogReducer.confirm);
    const data = useSelector((state) => state.getDialogReducer.data);
    const messageDialogReturnValue = useSelector((state) => state.getDialogReducer.messageDialogReturnValue);

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    return <CardBody>
        <TagSearchForm />
        <TagButtonList
            currentPage={currentPage}
            totalPage={totalPage}
        />
        <form name='view-class-form' className={'view-list-form'}>
            <RowHeader headerConfig={headerMap} />
            <RowBody
                showList={showTagList}
                handleOpenDialog={handleOpenDialog}
                messageDialogReturnValue={messageDialogReturnValue}
            />

        </form>
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





