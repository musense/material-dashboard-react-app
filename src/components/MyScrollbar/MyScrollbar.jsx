import React from "react";
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styles from './MyScrollbar.module.css'

function InnerMyScrollbar({
    children,
    component = 'div',
    height = '',
}, ref) {
    return (
        <div ref={ref} className={styles['my-scrollbar']} style={{ height: height }}>
            <PerfectScrollBar
                component={component}
            // suppressScrollX={true}
            >
                {children}
            </PerfectScrollBar>
        </div>
    )
}

const MyScrollbar = React.forwardRef(InnerMyScrollbar)

export default MyScrollbar
