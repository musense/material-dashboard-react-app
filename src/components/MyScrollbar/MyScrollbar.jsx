import React from "react";
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function MyScrollbar({
    children,
    component = 'div',
    height = '',
}) {
    return (
        <div style={{ height: height }}>
            <PerfectScrollBar
                component={component}
                suppressScrollX={true}
            >
                {children}
            </PerfectScrollBar>
        </div>
    )
}
