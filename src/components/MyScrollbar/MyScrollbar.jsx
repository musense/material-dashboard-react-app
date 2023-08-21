import React from "react";
import PerfectScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';
import styles from "./MyScrollbar.module.css"

export default function MyScrollbar({
    children,
    component = 'div',
    height = '',
    suppressScrollX = null
}) {
    console.log("🚀 ~ file: MyScrollbar.jsx:12 ~ suppressScrollX:", suppressScrollX)
    return (
        <div
            // className={styles['scrollbar']} 
            style={{ height: height }}>
            <PerfectScrollBar
                component={component}
                suppressScrollX={true}
            >
                {children}
            </PerfectScrollBar>
        </div>
    )
}
