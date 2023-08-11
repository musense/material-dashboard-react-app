import React, { forwardRef } from 'react';

const InnerResizableRow = ({ attributes, children }, ref) => {
    return (
        <tr ref={ref} {...attributes}>
            {children}
        </tr>
    );
};

const ResizableRow = forwardRef(InnerResizableRow);

export default ResizableRow;
