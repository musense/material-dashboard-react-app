import React from "react";
import { Icon } from '@mui/material';

export default function CloseIcon({onClose, distance, color}) {
    return <Icon onClick = {onClose}
           sx            = {{
            color: color,
            position: 'absolute',
            top: `${distance}px`,
            right: `${distance}px`,
            cursor: 'pointer',
            zIndex: '1',
        }}
    >close_icon</Icon>;
}


