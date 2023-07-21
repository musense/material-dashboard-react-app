import React, { useEffect, useState } from 'react'; // useState

// core components

// import { Outlet, useNavigate, Link } from 'react-router-dom';
import styles from './TagList.module.css'

import TagLeftWrapper from "./TagLeftWrapper";
import TagRightWrapper from "./TagRightWrapper";

import { useDispatch, useSelector } from 'react-redux';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { reDispatchMessage, errorMessage } from './../../reducers/errorMessage';

const tagDispatchMessage = [
    ...reDispatchMessage,
    errorMessage.addSuccess
]

function TagList() {
    const dispatch = useDispatch();
    const returnMessage = useSelector(state => state.getTagsReducer.errorMessage);
    useEffect(() => {
        if (tagDispatchMessage.includes(returnMessage)) {
            dispatch({ type: GetTagsAction.REQUEST_TAG })
        }
    }, [returnMessage]);

    const [isModalOpen, setIsModalOpen] = useState(true);

    function openModal() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className={styles['tag-container']}>
            <TagLeftWrapper />
            <TagRightWrapper />
        </div >

    );
}

export default TagList;





