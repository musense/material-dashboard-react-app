import React from "react";
import PageButtonList from '../../components/PageButtonList/PageButtonList';
import Button from '../../components/CustomButtons/Button';
import { useDispatch } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';

export default function TagButtonList({ currentPage, totalPage }) {

    const dispatch = useDispatch();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetTagsAction.REQUEST_TAG_PAGE,
            payload: pageNumber

        })
    }

    return <div style={{
        marginTop: '1.1rem',
    }}>
        <Button
            color='info'
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
            color='info'
            disabled={currentPage === totalPage}
            onClick={() => onPageButtonClick(currentPage + 1)}
        >
            下一頁
        </Button>
    </div>;
}