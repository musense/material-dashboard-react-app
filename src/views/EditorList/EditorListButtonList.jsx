import React from "react";
import { useDispatch } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import Button from 'components/CustomButtons/Button';
import PageButtonList from "./PageButtonList";

export default function EditorListButtonList({
    currentPage,
    totalPage
}) {
    console.log("🚀 ~ file: EditorListButtonList.jsx:12 ~ totalPage:", totalPage)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_PAGE,
            payload: pageNumber

        })
    }

    return <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Button
            color='info'
            onClick={() => {
                dispatch({
                    type: GetEditorAction.RESET_EDITOR
                });
                navigate('/admin/editorList/new');
            }}
        >
            新增文章
        </Button>
        <Button
            color='info'
            disabled={currentPage === 1}
            onClick={() => onPageButtonClick(currentPage - 1)}
        >
            上一頁
        </Button>
        <PageButtonList
            totalPage={totalPage}
            currentPage={currentPage} />
        <Button
            color='info'
            disabled={currentPage === totalPage}
            onClick={() => onPageButtonClick(currentPage + 1)}
        >
            下一頁
        </Button>
    </div>;
}

