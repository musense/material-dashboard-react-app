import React, { useMemo, useCallback } from "react";
import Button from 'components/CustomButtons/Button';
import { useDispatch } from "react-redux";
import * as GetEditorAction from "../../actions/GetEditorAction";

export default function PageButtonList({ totalPage, currentPage }) {
    const dispatch = useDispatch();

    const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);
    console.log("🚀 ~ file: PageButtonList.jsx:7 ~ PageButtonList ~ pageList:", pageList)

    const buttonProps = (page, currentPage) => ({
        color: currentPage === page ? 'rose' : 'info',
        onClick: () => dispatch({
            type: GetEditorAction.REQUEST_EDITOR_PAGE,
            payload: page
        })
    })

    return <>
        {pageList.map(page => {
            return currentPage === page
                ? (<Button {...buttonProps(page, currentPage)} key={page}>{page}</Button>)
                : (<Button {...buttonProps(page, currentPage)} key={page}>{page}</Button>)
        })}
    </>
}
