import React, { useCallback, useEffect } from 'react';
import * as GetDialogAction from '../../actions/GetDialogAction';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { useDispatch } from 'react-redux';

export default function RowBody({
    showList,
    handleOpenDialog,
    messageDialogReturnValue
}) {

    const dispatch = useDispatch();
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
            type: GetTagsAction.BUNCH_DELETE_TAG,
            payload: [id]
        });
        dispatch({
            type: GetDialogAction.RESET_MODAL_STATUS
        });
    }, [messageDialogReturnValue]);
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

    const onDelete = useCallback((id, name) => {
        dispatch({
            type: GetDialogAction.ON_DELETE_EDITOR,
            payload: {
                data: id,
                title: '是否刪除此標籤？',
                message: `標籤名稱：${name}`,
                confirm: true,
            }
        })
        handleOpenDialog()
    }, [handleOpenDialog])
    function onEdit(tag) {
        dispatch({
            type: GetTagsAction.EDITING_TAG,
            payload: {
                data: tag
            },
        });
    }
    return <div data-attr="data-body" className='view-body'>
        {showList && showList.length > 0 && showList.map((tag, index) => {
            return (
                <div data-attr="data-body-row" key={index} >
                    <BodyCell children={tag.name} />
                    <BodyCell children={getUpdateDateTime(tag.createDate)} />
                    <BodyCell children={tag.sorting} />
                    <EditBodyCell
                        onCopy={onCopyLink}
                        copyText={tag.webHeader.customUrl}
                        onEdit={onEdit}
                        editData={tag}
                        onDelete={onDelete}
                        deleteID={tag._id}
                        deleteTitle={tag.name}
                    />
                </div>);
        })}
    </div>;
}