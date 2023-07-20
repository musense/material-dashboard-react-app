
import React, { useState } from 'react';
import CardBody from 'components/Card/CardBody.jsx';
import { useSelector } from 'react-redux';
import MediaModal from './MediaModal';
import EditorSearchForm from './EditorSearchForm';
import EditorListButtonList from './EditorListButtonList';
import RowHeader from './RowHeader';
import RowBody from './RowBody';

export default function EditorListBody() {

    const showList = useSelector((state) => state.getEditorReducer.showList);
    console.log("🚀 ~ file: EditorListBody.jsx:28 ~ showList:", showList)
    const currentPage = useSelector((state) => state.getEditorReducer.currentPage);
    const totalPage = useSelector((state) => state.getEditorReducer.totalPage);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [mediaInfo, setMediaInfo] = useState(null);

    return <CardBody>
        <EditorSearchForm />
        <EditorListButtonList
            currentPage={currentPage}
            totalPage={totalPage}
        />
        <form className='view-list-form' name='view-editor-list-form' >
            <RowHeader />
            <RowBody
                showList={showList}
                handleOpen={handleOpen}
                setMediaInfo={setMediaInfo}
            />
            <RowHeader />
        </form>
        <MediaModal
            open={open}
            handleClose={handleClose}
            mediaInfo={mediaInfo}
        />
    </CardBody>;
}

