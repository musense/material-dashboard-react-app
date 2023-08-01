import React, { useCallback, useEffect } from "react";
import { Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import * as GetDialogAction from '../../actions/GetDialogAction';
import * as GetEditorAction from '../../actions/GetEditorAction';
import * as GetSlateAction from '../../actions/GetSlateAction';
import * as GetClassAction from '../../actions/GetClassAction';
import { useNavigate } from 'react-router-dom';
import BodyCell from "../../components/BodyCell/BodyCell";
import EditBodyCell from "../../components/EditBodyCell/EditBodyCell";

export default function RowBody({
    headerConfig,
    showList,
    handleOpen,
    setMediaInfo,
    handleOpenDialog,
    messageDialogReturnValue,
    className=null
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUpdateDateTime = (date) => `
    ${new Date(date).toLocaleDateString('zh-TW', {
        year: 'numeric', month: 'long', day: 'numeric'
    })} ${new Date(date).toLocaleTimeString('zh-TW', {
        hour: 'numeric', minute: 'numeric', hour12: 'numeric'
    })}`;

    useEffect(() => {
        const id = messageDialogReturnValue
        if (!id) return console.log('id is null');
        dispatch({
            type: GetEditorAction.BUNCH_DELETE_EDITOR,
            payload: [id]
        });
        dispatch({
            type: GetDialogAction.RESET_MODAL_STATUS
        });
    }, [messageDialogReturnValue]);

    const onDelete = useCallback((id, title) => {
        dispatch({
            type: GetDialogAction.ON_DELETE_EDITOR,
            payload: {
                data: id,
                contentData: title,
                message: `delete editor`,
                confirm: true,
            },
        });
        handleOpenDialog()
    }, [handleOpenDialog])

    const onCopyLink = useCallback(
        (sitemapUrl, result) => {
            console.log(sitemapUrl);
            console.log(result);
            dispatch({
                type: GetDialogAction.COPY_SITEMAP,
                payload: {
                    contentData: result ? sitemapUrl : '',
                    message: result ? 'copy sitemapUrl successfully' : 'copy sitemapUrl failed',
                },
            });
            handleOpenDialog();
        },
        [handleOpenDialog]
    );

    function onEdit(updateEditor) {
        console.log("🚀 ~ file: RowBody.jsx:70 ~ onEdit ~ updateEditor:", updateEditor)
        // reset form values
        dispatch({
            type: GetSlateAction.RESET_FORM_VALUE,
        })
        // reset selected dropdown list
        dispatch({
            type: GetClassAction.RESET_SELECTED_CLASS,
            payload: '--reset-all'
        })
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                _id: updateEditor._id,
            },
        });
        navigate(`/admin/editorList/${updateEditor._id}`);
    }
    const headerRow = headerConfig.headerRow
    return <div data-attr="data-body" className={`view-body ${className}`}>
        {showList && showList.length > 0 && showList.map((titleView, index) => {
            return (
                <div data-attr="data-body-row" key={index}>
                    {headerRow.map((rowItem, index) => {
                        if (rowItem.patchKey && rowItem.patchKey.includes(".")) {
                            const patchKeys = rowItem.patchKey.split(".");
                            return <BodyCell key={index} children={titleView[patchKeys[0]][patchKeys[1]]} className={rowItem.className} />
                        }
                        if (rowItem.patchKey === 'createDate' || rowItem.patchKey === 'updateDate') {
                            return (
                                <BodyCell
                                    key={index}
                                    children={getUpdateDateTime(titleView[rowItem.patchKey])}
                                    className={rowItem.className}
                                />
                            )
                        }
                        if (rowItem.patchKey === 'status') {
                            return <BodyCell key={index} className={rowItem.className} children={<Stack spacing={1} direction={'column'} >
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
                            </Stack>} />
                        }
                        if (rowItem.name === '圖片/影片') {
                            return <BodyCell key={index} children={titleView.media.contentImagePath !== ''
                                ? (
                                    <img
                                        src={titleView.media.homeImagePath}
                                        title={titleView.media.contentImagePath}
                                        alt={titleView.media.altText}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpen();
                                            setMediaInfo(titleView.media);
                                        }} />
                                ) : '無圖片/縮圖'}
                                className={rowItem.className}

                            />
                        }
                        if (rowItem.name === '編輯') {
                            return <EditBodyCell
                                key={index}
                                onCopy={onCopyLink}
                                copyText={titleView.sitemapUrl}
                                onEdit={onEdit}
                                editData={titleView}
                                onDelete={onDelete}
                                deleteID={titleView._id}
                                deleteTitle={titleView.content.title}
                                className={rowItem.className}
                            />
                        }
                        return <BodyCell key={index} children={titleView[rowItem.patchKey]} className={rowItem.className} />
                    })}
                </div>);
        })}
    </div>;
}

