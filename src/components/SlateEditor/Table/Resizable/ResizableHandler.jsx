import React, { useMemo } from 'react';

export default function ResizableHandler({ onMouseDown, position }) {
    const cursor = position === 'right' || position === 'left' ? 'col-resize' : 'row-resize';
    const otherPosition = cursor === 'col-resize' ? 'top' : 'left'
    const width = cursor === 'col-resize' ? '5px' : '100%';
    const height = cursor === 'col-resize' ? '100%' : '5px';
    const style = useMemo(() => ({
        width: width,
        height: height,
        position: 'absolute',
        [position]: 0,
        [otherPosition]: 0,
        cursor: cursor,
        // backgroundColor: 'rgba(0, 0, 0)',
    }), [width, height, position, otherPosition, cursor])
    return <div
        className="resizable-handle"
        onMouseDown={onMouseDown}
        style={style}
    />;
}
