import React, { useCallback, useEffect } from 'react';
import * as GetDialogAction from '../../actions/GetDialogAction';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetTagsAction from '../../actions/GetTagsAction';
import { useDispatch } from 'react-redux';

export default function RowBody({
    headerConfig,
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

    const onDelete = useCallback((id, name) => {
        dispatch({
            type: GetDialogAction.ON_DELETE_EDITOR,
            payload: {
                data: id,
                contentData: name,
                message: `delete tag`,
                confirm: true,
            },
        });
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
    const headerRow = headerConfig.headerRow
    return <div data-attr="data-body" className='view-body'>
        {showList && showList.length > 0 && showList.map((tag, index) => {
            return (
                <div data-attr="data-body-row" key={index} >
                    {headerRow.map((rowItem, index) => {
                        if (rowItem.patchKey === 'createDate') {
                            return (
                                <BodyCell
                                    key={index}
                                    children={getUpdateDateTime(tag[rowItem.patchKey])}
                                />
                            )
                        }
                        if (rowItem.patchKey === 'sorting') {
                            return tag.sorting
                                ? (
                                    <BodyCell
                                        key={index}
                                        children={tag.sorting}
                                        className={`is-popular-tag`}
                                    />
                                )
                                : (
                                    <BodyCell
                                        key={index}
                                        children={<span>-</span>}
                                        className={`not-popular-tag`}
                                    />
                                )
                        }
                        if (rowItem.name === '編輯') {
                            return <EditBodyCell
                                key={index}
                                onCopy={onCopyLink}
                                copyText={tag.webHeader.customUrl}
                                onEdit={onEdit}
                                editData={tag}
                                onDelete={onDelete}
                                deleteID={tag._id}
                                deleteTitle={tag.name}
                            />
                        }
                        return <BodyCell key={index} children={tag[rowItem.patchKey]} />
                    })}
                </div>);
        })}
    </div>;
}