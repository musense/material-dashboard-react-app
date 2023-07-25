import React from "react";
import Button from 'components/CustomButtons/Button';
import PageButtonList from '../../components/PageButtonList/PageButtonList';
import { useDispatch } from 'react-redux';
import * as GetClassAction from 'actions/GetClassAction';

export default function EditorClassButtonList({ currentPage, totalPage }) {

    const dispatch = useDispatch();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetClassAction.REQUEST_CLASS_PAGE,
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
            patchType={GetClassAction.REQUEST_CLASS_PAGE}
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