import React, { useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as GetEditorAction from '../../actions/GetEditorAction';
import Icon from './Icon'

export function HeaderCell({
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

    const icon = (patchKey) => {
        if (!patchKey) return null

        const iconClassName = `
        position: absolute;
        top: 10px;
        right: 10px;`

        const icon_name = sortingDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'
        return < Icon iconName={icon_name} classes={iconClassName} />
    };
    return <div className={className} >
        <input {...inputProps} />
        {icon(patchKey)}
    </div>;
}

export default function RowHeader() {
    return <div data-attr="data-header" className={`view-form`}>
        <div data-attr="data-header-row">
            <HeaderCell name="序號" patchKey="serialNumber" />
            <HeaderCell name="圖片/影片" />
            <HeaderCell name="分類" patchKey="classifications.label" />
            <HeaderCell name="標題" patchKey="content.title" className={'editor-list-title'} />
            <HeaderCell name="狀態" patchKey="status" />
            <HeaderCell name="更新日期" patchKey="updateDate" />
            <HeaderCell name="編輯" />
        </div>
    </div>;
}