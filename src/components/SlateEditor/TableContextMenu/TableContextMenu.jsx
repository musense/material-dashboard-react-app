import React, { useState } from 'react'
import useContextMenu from 'components/SlateEditor/customHooks/useContextMenu.js';
import Icon from 'views/Icons/Icon'
import './styles.css'
import { TableUtil } from '../utils/TableUtil'
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import menu from './menu.js'

const TableContextMenu = (props) => {
    const { editor } = props;
    const [selection, setSelection] = useState()
    const [showMenu, { top, left }] = useContextMenu(editor, 'table', setSelection);
    const table = new TableUtil(editor);

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