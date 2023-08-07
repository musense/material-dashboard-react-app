import React from "react";
import { cx, css } from '@emotion/css'

export default function Icon({ iconName, classes, onClick }) {
    const iconClassName = cx(
        'material-icons',
        css`        
        font-size: 18px;
        color    : #999;
        vertical-align: text-bottom;
        ${classes};`
    )
    const icon = <span className={iconClassName} onClick={onClick} >
        {iconName}
    </span>

    return icon;
}
