import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../../../views/Icons/Icon'
import usePopup from '../customHooks/usePopup'
import { Transforms } from 'slate';
import { TableUtil } from '../TableUtil'
import { Button } from './../components'
import { CustomEditor, TEXT_ALIGN_TYPES } from '../CustomEditor';

import './TableSelector.css'

const TableSelector = ({ editor }) => {
    const tableOptionsRef = useRef();
    const [selection, setSelection] = useState()
    const [showOptions, setShowOptions] = usePopup(tableOptionsRef);
    const [tableData, setTableData] = useState({
        row: 0,
        column: 0,
    })
    const [tableInput, setTableInput] = useState(Array.from({ length: 6 }, () => Array.from({ length: 6 }, (v, i) => ({
        bg: 'lightGray',
        column: i,
    }))))

    useEffect(() => {
        const newTable = Array.from({ length: 6 }, (obj, row) => Array.from({ length: 6 }, (v, col) => ({
            bg: row + 1 <= tableData.row && col + 1 <= tableData.column ? 'orange' : 'lightgray',
            column: col,
        })))
        setTableInput(newTable)
    }, [tableData])
    useEffect(() => {
        if (!showOptions) {
            setTableData({
                row: 0,
                column: 0,
            });
        }
    }, [showOptions])
    const table = new TableUtil(editor);

    const handleButtonClick = () => {
        setSelection(editor.selection);
        setShowOptions(prev => !prev)
    }
    const handleInsert = () => {
        selection && Transforms.select(editor, selection)
        setTableData({ row: -1, column: -1 })
        table.insertTable(tableData.row, tableData.column)
        setShowOptions(false)
    }
    return (
        <div ref={tableOptionsRef} className='popup-wrapper'>
            <Button
                active={CustomEditor.isBlockActive(
                    editor,
                    'table',
                    TEXT_ALIGN_TYPES.includes('table') ? 'align' : 'type')}
                title={'表格 ctrl+shift+t'}
                onMouseDown={handleButtonClick}>
                <Icon icon={'table'} />
            </Button>
            {
                showOptions &&
                <div className='popup' >
                    {

                        <span style={{ fontSize: '0.85em' }}><i>{`Insert a ${tableData.row >= 1 ? `${tableData.row} x ${tableData.column}` : ''} table`}</i></span>
                    }
                    <div className='table-input'>
                        {
                            tableInput.map((grp, row) =>
                                grp.map(({ column, bg }, col) =>
                                    <div key={row + col} onClick={() => handleInsert()} onMouseOver={() => setTableData({ row: row + 1, column: column + 1 })} className='table-unit' style={{ border: `1px solid ${bg}` }}></div>
                                )
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default TableSelector;