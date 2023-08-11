import React from 'react';

const Table = ({ attributes, children, element }) => {
    console.log("🚀 ~ file: Table.jsx:6 ~ Table ~ children:", children)

    return (
        <table data-alignment={element.alignment}>
            <tbody {...attributes}>
                {children}
            </tbody>
        </table>
    )
}

export default Table;