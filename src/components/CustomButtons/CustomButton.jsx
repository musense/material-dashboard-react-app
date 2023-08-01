import React from "react";
import Button from '@mui/material/Button';

export default function CustomButton() {
    const buttonProps = {
        color: 'info',
        size: 'small',
        variant: 'contained',
    }

    return <Button
        {...buttonProps}
    >
        新增文章
    </Button>;
}
