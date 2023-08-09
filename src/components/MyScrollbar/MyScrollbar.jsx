import React from "react";
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styles from "./MyScrollbar.module.css"

export default function MyScrollbar({ children, component = 'div', height = '' }) {
    return (
        <div className={styles['scrollbar']} style={{ height: height }}>
            <ScrollBar component={component}>
                {children}
            </ScrollBar>
        </div>
    )
}
