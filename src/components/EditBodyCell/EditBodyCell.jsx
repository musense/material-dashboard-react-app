import React from "react";
import Icon from './Icon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import BodyCell from "./../BodyCell/BodyCell";
import { Stack } from '@mui/material';

export default function EditBodyCell({
    onCopy,
    copyText,
    onEdit,
    editData,
    onDelete,
    deleteID,
    deleteTitle,
    className
}) {
    return <BodyCell className={className} children={<Stack spacing={2} direction={'row'} >
        <CopyToClipboard text={copyText} onCopy={(text, result) => onCopy(text, result)}>
            <div className="edit-icon-wrapper">
                <input title="複製連結" className="edit-icon-input" type="button" />
                <Icon iconName={'link'} />
            </div>
        </CopyToClipboard>
        <div className="edit-icon-wrapper">
            <input title="編輯" className="edit-icon-input" type="button" onClick={() => onEdit(editData)} />
            <Icon iconName={'edit'} />
        </div>
        <div className="edit-icon-wrapper">
            <input title="刪除" className="edit-icon-input" type="button" onClick={() => onDelete(deleteID, deleteTitle)} />
            <Icon iconName={'delete_forever'} />
        </div>
    </Stack>} />;
}
