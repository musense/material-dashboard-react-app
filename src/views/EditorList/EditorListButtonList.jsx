import React, { useCallback } from "react";
import { useDispatch } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import PageButtonList from "components/PageButtonList/PageButtonList";
import { Typography } from "@material-ui/core";

export default function EditorListButtonList({
    currentPage,
    totalPage,
    totalCount
}) {
    console.log("🚀 ~ file: EditorListButtonList.jsx:12 ~ totalPage:", totalPage)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onAddNew = useCallback(() => {
        dispatch({
            type: GetEditorAction.ADD_NEW_EDITOR
        });
        navigate('/admin/editorList/new');
    }, [dispatch, navigate])

    const onPageButtonClick = useCallback((pageNumber) => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_PAGE,
            payload: pageNumber

        })
    }, [dispatch])

    const buttonProps = {
        color: 'info',
        size: 'small',
        variant: 'contained',
    }

    return <Stack spacing={2} direction={'row'} display={'flex'} alignItems={'center'} sx={{ my: '1rem' }}>
        <Button
            {...buttonProps}
            onClick={onAddNew}>
            新增文章
        </Button>
        <Button
            {...buttonProps}
            disabled={currentPage === 1}
            onClick={() => onPageButtonClick(currentPage - 1)}>
            上一頁
        </Button>
        <PageButtonList
            totalPage={totalPage}
            currentPage={currentPage}
            patchType={GetEditorAction.REQUEST_EDITOR_PAGE} />
        <Button
            {...buttonProps}
            disabled={currentPage === totalPage}
            onClick={() => onPageButtonClick(currentPage + 1)}>
            下一頁
        </Button>
        <Typography sx={{ fontSize: 16 }}>
            合計：{totalCount}筆
        </Typography>
    </Stack>;
}

