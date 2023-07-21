import React, { useMemo, useCallback } from "react";
import Button from 'components/CustomButtons/Button';
import { useDispatch } from "react-redux";
import * as GetEditorAction from "../../actions/GetEditorAction";

export default function PageButtonList({ totalPage, currentPage }) {
    const dispatch = useDispatch();

    const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);
    console.log("🚀 ~ file: PageButtonList.jsx:7 ~ PageButtonList ~ pageList:", pageList)

    const requestPage = (page) => useCallback(() => {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_PAGE,
            payload: page
        })
    }, [])

    const buttonProps = (page) => useMemo(() => ({
        color: currentPage === page ? 'rose' : 'info',
        onClick: requestPage(page)
    }), [currentPage])

    return <>
        {pageList.map(page => {
            return currentPage === page
                ? (<Button {...buttonProps(page)} key={page}>{page}</Button>)
                : (<Button {...buttonProps(page)} key={page}>{page}</Button>)
        })}
    </>
}
