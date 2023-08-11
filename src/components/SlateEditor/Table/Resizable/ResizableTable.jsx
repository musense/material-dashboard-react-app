import React from 'react';

const ResizableTable = ({ attributes, children, element }) => {
    return (
        <table data-alignment={element.alignment}>
            <tbody {...attributes}>
                {children}
            </tbody>
        </table>
    );
}

export default ResizableTable;
