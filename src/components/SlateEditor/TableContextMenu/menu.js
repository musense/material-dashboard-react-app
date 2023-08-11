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

export default menu