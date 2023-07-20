
import React, { useEffect, useMemo, useRef, useState } from 'react';
import CardBody from 'components/Card/CardBody.jsx';

import { useDispatch, useSelector } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
// import Button from 'components/CustomButtons/Button';
import { useNavigate } from 'react-router-dom';
import styles from './EditorList.module.css'
import Button from 'components/CustomButtons/Button';
import MediaModal from './MediaModal';
import EditorSearchForm from './EditorSearchForm';
import { Stack } from '@mui/material';
import { cx, css } from '@emotion/css'

export default function EditorListBody() {

    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const checkedToDeleteMapRef = useRef(new Map())
    const dispatch = useDispatch();

    const showList = useSelector((state) => state.getEditorReducer.showList);
    console.log("🚀 ~ file: EditorListBody.jsx:28 ~ showList:", showList)
    const currentPage = useSelector((state) => state.getEditorReducer.currentPage);
    const totalPage = useSelector((state) => state.getEditorReducer.totalPage);



    function onEdit(updateEditor) {
        // console.log(updateEditor);
        // return
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                data: {
                    _id: updateEditor._id,
                },
            },
        });
        // return
        navigate(`/admin/editorList/${updateEditor._id}`);
    }
    function onSearchBunchDeleteList(e) {
        e.preventDefault()
        const deleteIds = []
        for (const [key, value] of checkedToDeleteMapRef.current.entries()) {
            if (!value) continue
            deleteIds.push(key)
        }
        console.log("🚀 ~ file: EditorClassList.jsx:142 ~ onDelete ~ deleteKeys:", deleteIds)

        dispatch({
            type: GetEditorAction.BUNCH_DELETE_EDITOR,
            payload: deleteIds
        });
        e.target.reset();
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [mediaInfo, setMediaInfo] = useState(null);
    const getUpdateDateTime = (date) => `
    ${new Date(date).toLocaleDateString('zh-TW', {
        year: 'numeric', month: 'long', day: 'numeric'
    })} ${new Date(date).toLocaleTimeString('zh-TW', {
        hour: 'numeric', minute: 'numeric', hour12: 'numeric'
    })}`;
    return <CardBody>
        <EditorSearchForm />
        <EditorListButtonList
            currentPage={currentPage}
            totalPage={totalPage}
            setActive={setActive}
        />
        <form name='view-editor-list-form' onSubmit={onSearchBunchDeleteList}>
            <RowHeader />
            <RowBody
                showList={showList}
                onEdit={onEdit}
                handleOpen={handleOpen}
                setMediaInfo={setMediaInfo}
                getUpdateDateTime={getUpdateDateTime}
            />
            <RowHeader />
        </form>
        <MediaModal
            open={open}
            handleClose={handleClose}
            mediaInfo={mediaInfo}
        />
    </CardBody>;
}


function RowBody({
    showList,
    onEdit,
    handleOpen,
    setMediaInfo,
    getUpdateDateTime
}) {
    return <div data-attr="data-body" className={`view-body ${styles['view-editor-list-body']}`}>
        {showList && showList.length > 0 && showList.map((titleView, index) => {
            return (
                <div data-attr="data-body-row" key={index} onClick={() => onEdit(titleView)}>
                    <div name="序號">{parseInt(titleView.serialNumber)}</div>
                    <div name="圖片/影片" className={styles['view-editor-image-container']}>
                        {titleView.media.banner !== ''
                            ? (
                                <img
                                    src={titleView.media.thumbnail}
                                    title={titleView.media.banner}
                                    alt={titleView.media.altText}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpen();
                                        setMediaInfo(titleView.media);
                                    }} />
                            ) : (
                                <div className={styles['view-editor-image-container']}>無圖片/縮圖</div>
                            )}
                    </div>
                    <div name="分類" className={styles['class-cell']}>{titleView.classifications.label}</div>
                    <div name="標題" className={styles['editor-list-title']}>
                        <a href={titleView.sitemapUrl}
                            target='_blank'
                            title={titleView.sitemapUrl}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {titleView.content.title}
                        </a>
                    </div>

                    <div name="狀態" >
                        <Stack spacing={1} direction={'column'}>
                            <span style={{
                                color: titleView.status === '已發布' ? 'green'
                                    : titleView.status === '已排程' ? 'red'
                                        : titleView.status === '草稿' ? 'black'
                                            : 'grey',
                                fontWeight: 'bold'
                            }}>
                                {titleView.status}
                            </span>
                            <span>
                                {
                                    titleView.isPublished
                                        ? getUpdateDateTime(titleView.publishDate)
                                        : titleView.isScheduled
                                            ? getUpdateDateTime(titleView.scheduleTime)
                                            : null
                                }
                            </span>
                        </Stack>
                    </div>
                    <div name="更新日期" className={styles['edit-cell']}>
                        <span>
                            {getUpdateDateTime(titleView.updateDate)}
                        </span>
                    </div>
                    <div name="編輯" className={styles['edit-cell']}></div>
                </div>);
        })}
    </div>;
}

function RowHeader() {
    return <div data-attr="data-header" className={`view-form ${styles['view-editor-list-header']}`}>
        <div data-attr="data-header-row">
            <ColumnHeader name="序號" patchKey="serialNumber" />
            <ColumnHeader name="圖片/影片" />
            <ColumnHeader name="分類" patchKey="classifications.label" />
            <ColumnHeader name="標題" patchKey="content.title" className={'editor-list-title'} />
            <ColumnHeader name="狀態" patchKey="status" />
            <ColumnHeader name="更新日期" patchKey="updateDate" />
            <ColumnHeader name="編輯" />
        </div>
    </div>;
}

function ColumnHeader({
    name,
    patchKey = null,
    className = null
}) {
    const dispatch = useDispatch();
    const sortingDirection = useSelector((state) => state.getEditorReducer.sortingMap[patchKey]);

    console.log(`🚀 ~ file: EditorListBody.jsx:190 ~ sortingDirection`, sortingDirection)

    const onSortingClick = (key) => {
        dispatch({
            type: GetEditorAction.SHOW_EDITOR_LIST_SORTING,
            payload: {
                key: key
            }
        })
    }
    const inputProps = useMemo(() => patchKey ? ({
        type: 'button',
        value: name,
        onClick: () => onSortingClick(patchKey)
    }) : ({
        type: 'button',
        value: name,
    }), [name, patchKey])

    const iconClassName = cx(
        'material-icons',
        css`
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 18px;
        color    : #999;
        vertical-align: text-bottom;`
    )

    const icon = patchKey && (
        <span className={iconClassName}>{
            sortingDirection === 'asc' ? 'arrow_downward' : 'arrow_upward'
        }</span>
    );
    return <div className={className} >
        <input {...inputProps} />
        {icon}
    </div>;
}

function EditorListButtonList({
    currentPage,
    totalPage,
    setActive
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onPageButtonClick(pageNumber) {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_PAGE,
            payload: pageNumber

        })
    }

    return <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Button
            color='info'
            onClick={() => {
                dispatch({
                    type: GetEditorAction.RESET_EDITOR
                });
                navigate('/admin/editorList/new');
            }}
        >
            新增文章
        </Button>
        <Button
            color='info'
            disabled={currentPage === 1}
            onClick={() => onPageButtonClick(currentPage - 1)}
        >
            上一頁
        </Button>
        <Button
            color='info'
            disabled={currentPage === totalPage}
            onClick={() => onPageButtonClick(currentPage + 1)}
        >
            下一頁
        </Button>
        <Button
            color='info'
            onClick={() => setActive(prevActive => !prevActive)}
        >
            刪除文章
        </Button>
    </div>;
}
