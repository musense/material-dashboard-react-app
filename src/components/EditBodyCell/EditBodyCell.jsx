import React from "react";
import BodyCell from "./../BodyCell/BodyCell";
import { Stack } from '@mui/material';
import IconCell from "./IconCell";

export default function EditBodyCell({
    onCopy,
    copyText,
    onEdit,
    editData,
    onDelete,
    deleteID,
    deleteTitle,
    className,
    note = null
}) {
    console.log("🚀 ~ file: EditBodyCell.jsx:18 ~ copyText:", copyText)


    return <BodyCell className={className} children={<Stack spacing={2} direction={'row'} >
        {note && <IconCell
            iconName={'text_snippet'}
            iconTitle={'備註'}
            callback={() => onEdit(editData)}
        />}
        <IconCell
            copy
            iconName={'link'}
            iconTitle={'複製連結'}
            callback={(text, result) => onCopy(text, result)}
            copyText={copyText}
        />
        <IconCell
            iconName={'edit'}
            iconTitle={'編輯'}
            callback={() => onEdit(editData)}
        />
        <IconCell
            iconName={'delete_forever'}
            iconTitle={'刪除'}
            callback={() => onDelete(deleteID, deleteTitle)}
        />
    </Stack>} />;
}


