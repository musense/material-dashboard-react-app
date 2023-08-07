import React from "react";
import { useDispatch } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import PageButtonList from "components/PageButtonList/PageButtonList";
import { Typography } from "@material-ui/core";

export default function EditorClassButtonList({
    currentPage,
    totalPage,
    totalCount,
}) {

    const dispatch = useDispatch();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetClassAction.REQUEST_CLASS_PAGE,
            payload: pageNumber

        })
    }

    const buttonProps = {
        color: 'info',
        size: 'small',
        variant: 'contained',
    }


    return <Stack spacing={2} direction={'row'}
        display={'flex'} useFlexGap flexWrap="wrap"
        alignItems={'center'} sx={{ my: '1rem' }}>
        <Button
            {...buttonProps}
            disabled={currentPage === 1}
            onClick={() => onPageButtonClick(currentPage - 1)} >
            上一頁
        </Button>
        <PageButtonList
            totalPage={totalPage}
            currentPage={currentPage}
            patchType={GetClassAction.REQUEST_CLASS_PAGE} />
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