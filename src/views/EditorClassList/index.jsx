import React, { useRef, useState } from 'react'; // useState

// core components

// import { Outlet, useNavigate, Link } from 'react-router-dom';
import styles from './EditorClassList.module.css'

import EditorLeftWrapper from "./EditorLeftWrapper";
import EditorRightWrapper from "./EditorRightWrapper";

import { useDispatch } from 'react-redux';
import * as GetClassAction from '../../actions/GetClassAction';


function EditorClassList() {
    const dispatch = useDispatch();
    dispatch({ type: GetClassAction.REQUEST_PARENT_CLASS })
    dispatch({ type: GetClassAction.REQUEST_CLASS_LIST })
    
    const [isModalOpen, setIsModalOpen] = useState(true);

    function openModal() {
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className={styles['editor-container']}>
            <EditorLeftWrapper />
            <EditorRightWrapper />
        </div >

    );
}

export default EditorClassList;





