import React, { forwardRef } from 'react';
import useResize from '../../customHooks/useResize'; // 確保這是正確的路徑
import ResizableHandler from './ResizableHandler';

const InnerResizableCell = ({ attributes, attr, children }, ref) => {
    const [size, onMouseDown, resizing] = useResize();

    return (
        <td
            ref={ref}
            {...attributes}
            {...attr}
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {resizing && <div className="resize-overlay" />}
            <ResizableHandler onMouseDown={onMouseDown} position={'top'} />
            <ResizableHandler onMouseDown={onMouseDown} position={'bottom'} />
            <ResizableHandler onMouseDown={onMouseDown} position={'left'} />
            <ResizableHandler onMouseDown={onMouseDown} position={'right'} />
            {children}
        </td>
    );
};

const ResizableCell = forwardRef(InnerResizableCell)
export default ResizableCell;