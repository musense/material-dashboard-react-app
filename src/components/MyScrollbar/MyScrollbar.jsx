import React from "react";
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styles from "./MyScrollbar.module.css"

export default function MyScrollbar({ children }) {
    return (
        <div className={styles['scrollbar']}>
            <ScrollBar component="div">
                {children}
            </ScrollBar>
        </div>
    )
}
