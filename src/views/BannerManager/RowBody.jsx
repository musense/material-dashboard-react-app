import React, { useCallback, useEffect } from 'react';
import * as GetDialogAction from '../../actions/GetDialogAction';
import BodyCell from 'components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetBannerAction from '../../actions/GetBannerAction';
import { useDispatch } from 'react-redux';

export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    messageDialogReturnValue,
    className = null
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
            type: GetBannerAction.BUNCH_DELETE_BANNER,
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
                message: `delete Banner`,
                confirm: true,
            },
        });
        handleOpenDialog()
    }, [handleOpenDialog])
    function onEdit(Banner) {
        dispatch({
            type: GetBannerAction.EDITING_BANNER,
            payload: {
                data: Banner
            },
        });
    }
    const headerRow = headerConfig.headerRow
    return <div data-attr="data-body" className={`view-body ${className}`}>
        {showList && showList.length > 0 && showList.map((Banner, index) => {
            return (
                <div data-attr="data-body-row" key={index} >
                    {headerRow.map((rowItem, index) => {
                        if (rowItem.patchKey === 'createDate') {
                            return (
                                <BodyCell
                                    key={index}
                                    children={getUpdateDateTime(Banner[rowItem.patchKey])}
                                />
                            )
                        }
                        if (rowItem.patchKey === 'sorting') {
                            return Banner.sorting
                                ? (
                                    <BodyCell
                                        key={index}
                                        children={Banner.sorting}
                                        className={`is-popular-Banner`}
                                    />
                                )
                                : (
                                    <BodyCell
                                        key={index}
                                        children={<span>-</span>}
                                        className={`not-popular-Banner`}
                                    />
                                )
                        }
                        if (rowItem.name === '編輯') {
                            return <EditBodyCell
                                key={index}
                                onCopy={onCopyLink}
                                copyText={Banner.webHeader.customUrl}
                                onEdit={onEdit}
                                editData={Banner}
                                onDelete={onDelete}
                                deleteID={Banner._id}
                                deleteTitle={Banner.name}
                            />
                        }
                        return <BodyCell key={index} children={Banner[rowItem.patchKey]} />
                    })}
                </div>);
        })}
    </div>;
}