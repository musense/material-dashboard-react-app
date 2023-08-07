import React from "react";
import PageButtonList from '../../components/PageButtonList/PageButtonList';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { Typography } from "@material-ui/core";

export default function TagButtonList({
    currentPage,
    totalPage,
    totalCount
}) {

    const dispatch = useDispatch();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetTagsAction.REQUEST_TAG_PAGE,
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
            onClick={() => onPageButtonClick(currentPage - 1)}
        >
            上一頁
        </Button>
        <PageButtonList
            totalPage={totalPage}
            currentPage={currentPage}
            patchType={GetTagsAction.REQUEST_TAG_PAGE}
        />
        <Button
            {...buttonProps}
            disabled={currentPage === totalPage}
            onClick={() => onPageButtonClick(currentPage + 1)}
        >
            下一頁
        </Button>
        <Typography sx={{ fontSize: 16 }}>
            合計：{totalCount}筆
        </Typography>
    </Stack>;
}