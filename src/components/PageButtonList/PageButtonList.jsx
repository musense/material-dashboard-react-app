import React from "react";
import Button from 'components/CustomButtons/Button';
import { useDispatch } from "react-redux";

export default function PageButtonList({ totalPage, currentPage, patchType }) {
    const dispatch = useDispatch();

    const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);
    console.log("🚀 ~ file: PageButtonList.jsx:7 ~ PageButtonList ~ pageList:", pageList)

    const buttonProps = (page, currentPage) => ({
        color: currentPage === page ? 'rose' : 'info',
        onClick: () => dispatch({
            type: patchType,
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
