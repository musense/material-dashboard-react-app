import React, { useState, useMemo, useEffect } from 'react'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { css } from '@emotion/css';
import { useCallback } from 'react';
import dayjs from 'dayjs';

const DatePicker = ({
    title,
    width,
    height,
    state,
    setState
}) => {

    const [value, setValue] = useState(dayjs(state));

    useEffect(() => {
        handleChange(dayjs(state));
    }, [state]);

    const handleChange = useCallback((newValue) => {
        const formattedValue = newValue.format('YYYY-MM-DD');
        setValue(newValue)
        setState && setState(formattedValue)
    }, [setValue, setState])

    const styles = useMemo(() => ({
        height: height,
        border: '1px solid black',
        borderRadius: '4px',
        width: width,
        '& input': {
            paddingTop: '9px',
            paddingBottom: '9px',
            boxSizing: 'border-box',
            height: height
        }
    }), [height, width])

    return (
        <div className={css`
        display:flex;
        flex-direction: column;
            `}>
            <label htmlFor={title}>{title}</label>
            <MUIDatePicker
                sx={styles}
                className={css`
                    background-color: #fff;
                `}
                name={title}
                value={value}
                onChange={handleChange}
                maxDate={dayjs()}
            />
        </div>
    )
}

export default DatePicker