import React, { useCallback, useEffect } from "react";
import { Stack } from '@mui/material';
import Icon from './Icon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import * as GetDialogAction from '../../actions/GetDialogAction';
import * as GetEditorAction from '../../actions/GetEditorAction';
import { useNavigate } from 'react-router-dom';

function BodyCell({ children, className = null }) {
    return <div className={className}>{children}</div>;
}

export default function RowBody({
    showList,
    handleOpen,
    setMediaInfo,
    handleOpenDialog,
    messageDialogReturnValue
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
                title: '是否刪除此文章？',
                message: `標題：${title}`,
                confirm: true,
            }
        })
        handleOpenDialog()
    }, [handleOpenDialog])

    const generateTitle = result => {
        return result ? '複製成功' : '複製失敗！'
    }
    const generateMessage = (result, sitemapUrl) => {
        return result ? `你已複製url: ${sitemapUrl}` : '有什麼地方出錯了QQ'
    }
    const onCopyLink = useCallback((sitemapUrl, result) => {
        console.log(sitemapUrl);
        console.log(result);
        const title = generateTitle(result)
        const message = generateMessage(result, sitemapUrl)
        dispatch({
            type: GetDialogAction.COPY_SITEMAP,
            payload: {
                title,
                message
            }
        })
        handleOpenDialog()
    }, [handleOpenDialog])

    function onEdit(updateEditor) {
        dispatch({
            type: GetEditorAction.REQUEST_EDITOR_BY_ID,
            payload: {
                data: {
                    _id: updateEditor._id,
                },
            },
        });
        navigate(`/admin/editorList/${updateEditor._id}`);
    }

    return <div data-attr="data-body" className={`view-body`}>
        {showList && showList.length > 0 && showList.map((titleView, index) => {
            return (
                <div data-attr="data-body-row" key={index}>
                    <BodyCell children={titleView.serialNumber} />
                    <BodyCell children={titleView.media.banner !== ''
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
                        ) : '無圖片/縮圖'} className={'view-editor-image-container'} />
                    <BodyCell children={titleView.classifications.label} />
                    <BodyCell children={titleView.content.title} className={'editor-list-title'} />
                    <BodyCell children={<Stack spacing={1} direction={'column'}>
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
                    <BodyCell children={getUpdateDateTime(titleView.updateDate)} />
                    <BodyCell children={<Stack spacing={2} direction={'row'}>
                        <CopyToClipboard text={titleView.sitemapUrl} onCopy={(text, result) => onCopyLink(text, result)}>
                            <div className="edit-icon-wrapper">
                                <input title="複製連結" className="edit-icon-input" type="button" />
                                < Icon iconName={'link'} />
                            </div>
                        </CopyToClipboard>
                        <div className="edit-icon-wrapper">
                            <input title="編輯" className="edit-icon-input" type="button" onClick={() => onEdit(titleView)} />
                            < Icon iconName={'edit'} />
                        </div>
                        <div className="edit-icon-wrapper">
                            <input title="刪除" className="edit-icon-input" type="button" onClick={() => onDelete(titleView._id, titleView.content.title)} />
                            < Icon iconName={'delete_forever'} />
                        </div>
                    </Stack>} />
                </div>);
        })}
    </div>;
}