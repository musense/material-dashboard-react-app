import React from "react";
import BodyCell from "./../BodyCell/BodyCell";
import { Stack } from '@mui/material';
import IconCell from "./IconCell";
import useEditCellFunction from "hook/useEditCellFunction";

export default function EditBodyCell({
    copyText,
    id,
    name,
    deleteMessage,
    editType,
    editData,
    handleOpenDialog,
    onNote = null,
    note = null,
    className,
    callback = null
}) {
    console.log("🚀 ~ file: EditBodyCell.jsx:18 ~ copyText:", copyText)

    const {
        onCopy,
        onDelete,
        onEdit
    } = useEditCellFunction({
        handleOpenDialog,
        onDelete: {
            id,
            name,
            message: deleteMessage,
        },
        onEdit: {
            editType,
            data: editData,
            callback: callback
        }
    }
    )
    return <BodyCell className={className} children={
        <Stack spacing={2} direction={'row'}
            useFlexGap flexWrap="wrap" justifyContent={"space-evenly"}
        >
            {note && <IconCell
                iconName={'text_snippet'}
                iconTitle={'備註'}
                callback={onNote}
            />}
            <IconCell
                copy
                iconName={'link'}
                iconTitle={'複製連結'}
                copyText={copyText}
                callback={onCopy}
            />
            <IconCell
                iconName={'pen'}
                iconTitle={'編輯'}
                callback={onEdit}
            />
            <IconCell
                iconName={'trashCan'}
                iconTitle={'刪除'}
                callback={onDelete}
            />
        </Stack>} />;
}


