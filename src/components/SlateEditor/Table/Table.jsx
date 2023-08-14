import React from 'react';

const Table = ({ attributes, children, element }) => {

    return (
        <table data-alignment={element.alignment}>
            <tbody {...attributes}>
                {children}
            </tbody>
        </table>
    )
}

export default Table;