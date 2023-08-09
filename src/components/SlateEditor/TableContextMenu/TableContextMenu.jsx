import React, { useEffect, useState } from 'react'
import useContextMenu from 'components/SlateEditor/customHooks/useContextMenu.js';
import Icon from 'views/Icons/Icon'
import './styles.css'
import { TableUtil } from '../TableUtil'
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';

const TableContextMenu = (props) => {
    const { editor } = props;
    const [selection, setSelection] = useState()
    const [showMenu, { top, left }] = useContextMenu(editor, 'table', setSelection);
    const table = new TableUtil(editor);


    const menu = [
        {
            icon: 'tableToLeft',
            text: '表格置左',
            action: {
                type: 'justify',
                alignment: 'left'
            }
        },
        {
            icon: 'tableToCenter',
            text: '表格置中',
            action: {
                type: 'justify',
                alignment: 'center'
            }
        },
        {
            icon: 'tableToRight',
            text: '表格置右',
            action: {
                type: 'justify',
                alignment: 'right'
            }
        },
        {
            icon: 'insertColumnRight',
            text: '右側插入一欄',
            action: {
                type: 'insertColumn',
                position: 'after'
            }
        },
        {
            icon: 'insertColumnLeft',
            text: '左側插入一欄',
            action: {
                type: 'insertColumn',
                position: 'at'
            }
        },
        {
            icon: 'insertRowAbove',
            text: '上面插入一列',
            action: {
                type: 'insertRow',
                position: 'at'
            }
        },
        {
            icon: 'insertRowBelow',
            text: '下面插入一列',
            action: {
                type: 'insertRow',
                position: 'after'
            }
        },
        {
            icon: 'deleteRow',
            text: '刪除列',
            action: {
                type: 'deleteRow'
            }
        },
        {
            icon: 'deleteColumn',
            text: '刪除欄',
            action: {
                type: 'deleteColumn'
            }
        },
        {
            icon: 'trashCan',
            text: '刪除表格',
            action: {
                type: 'remove'
            }
        }
    ]


    const handleInsert = ({ type, position, alignment }) => {
        Transforms.select(editor, selection)
        switch (type) {
            case 'insertRow':
                table.insertRow(position);
                break;
            case 'insertColumn':
                table.insertColumn(position);
                break;
            case 'remove':
                table.removeTable();
                break;
            case 'deleteRow':
                table.deleteRow();
                break;
            case 'deleteColumn':
                table.deleteColumn();
                break;
            case 'justify':
                table.addStyle(alignment);
                break;
            default:
                return;

        }
        ReactEditor.focus(editor);
    }

    return (
        showMenu &&
        <div className='contextMenu' style={{ top, left }}>
            {
                menu.map(({ icon, text, action }, index) =>
                    <div className='menuOption' key={index} onClick={() => handleInsert(action)}>
                        <Icon icon={icon} />
                        <span>{text}</span>
                    </div>
                )
            }
        </div>
    )
}

export default TableContextMenu;