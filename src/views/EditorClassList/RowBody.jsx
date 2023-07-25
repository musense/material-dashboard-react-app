import React,{useEffect, useCallback} from "react";
import BodyCell from '../../components/BodyCell/BodyCell';
import EditBodyCell from '../../components/EditBodyCell/EditBodyCell';
import * as GetDialogAction from '../../actions/GetDialogAction';
import * as GetClassAction from 'actions/GetClassAction';
import { useDispatch } from 'react-redux';


export default function RowBody({
    headerConfig,
    showList,
    handleOpenDialog,
    messageDialogReturnValue,
}) {
    const dispatch = useDispatch();

    const getUpdateDateTime = (date) => `
    ${new Date(date).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })} ${new Date(date).toLocaleTimeString('zh-TW', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: 'numeric',
    })}`;

    useEffect(() => {
        const id = messageDialogReturnValue;
        if (!id) return console.log('id is null');
        dispatch({
            type: GetClassAction.BUNCH_DELETE_CLASS,
            payload: [id],
        });
        dispatch({
            type: GetDialogAction.RESET_MODAL_STATUS,
        });
    }, [messageDialogReturnValue]);

    const generateTitle = (result) => {
        return result ? '複製成功' : '複製失敗！';
    };
    const generateMessage = (result, sitemapUrl) => {
        return result ? `你已複製url: ${sitemapUrl}` : '有什麼地方出錯了QQ';
    };
    const onCopyLink = useCallback(
        (sitemapUrl, result) => {
            console.log(sitemapUrl);
            console.log(result);
            const title = generateTitle(result);
            const message = generateMessage(result, sitemapUrl);
            dispatch({
                type: GetDialogAction.COPY_SITEMAP,
                payload: {
                    title,
                    message,
                },
            });
            handleOpenDialog();
        },
        [handleOpenDialog]
    );

    const onDelete = useCallback(
        (id, name) => {
            dispatch({
                type: GetDialogAction.ON_DELETE_EDITOR,
                payload: {
                    data: id,
                    title: '是否刪除此標籤？',
                    message: `標籤名稱：${name}`,
                    confirm: true,
                },
            });
            handleOpenDialog();
        },
        [handleOpenDialog]
    );

    function onEdit(editorClass) {
        dispatch({
            type: GetClassAction.EDITING_CLASS,
            payload: {
                editorClass: editorClass,
            },
        });
    }

    const headerRow = headerConfig.headerRow;
    return (
        <div data-attr='data-body' className='view-body'>
            {showList &&
                showList.length > 0 &&
                showList.map((editorClass, index) => {
                    return (
                        <div data-attr='data-body-row' key={index}>
                            {headerRow.map((rowItem, index) => {
                                if (rowItem.patchKey === 'customUrl') {
                                    return (
                                        <BodyCell
                                            key={index}
                                            children={
                                                <a href={editorClass.customUrl}
                                                    target='_blank'
                                                    rel='noopener noreferrer'>
                                                    {editorClass.customUrl}
                                                </a>
                                            }
                                        />
                                    )
                                }
                                if (rowItem.name === '編輯') {
                                    return <EditBodyCell
                                        key={index}
                                        onCopy={onCopyLink}
                                        copyText={editorClass.customUrl}
                                        onEdit={onEdit}
                                        editData={editorClass}
                                        onDelete={onDelete}
                                        deleteID={editorClass._id}
                                        deleteTitle={editorClass.name}
                                    />
                                }
                                return <BodyCell key={index} children={editorClass[rowItem.patchKey]} />
                            })}
                        </div>
                    );
                })}
        </div>
    );
}
